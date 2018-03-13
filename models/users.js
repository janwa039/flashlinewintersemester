const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate: {
            validator:(value) =>
                {
                    return validator.isEmail(value);
                },
            message:'{VALUE} is not a valid email address'
            }
    },
        password:{
            type:String,
            required:true,
            minlength:6,
            unique:true
    },
    tokens:[{
      access:{
        type:String,
        required:true
      },
        token:{
            type:String,
            required:true
        }

    }]

});


UserSchema.methods.generateToken=function(){
    var user=this;
    var access='auth';

    return new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, (error, result)=>{
          if (error) {
            reject(error);
          }else {
            var token=jwt.sign({_id:user._id.toHexString(), access}, result).toString();
            user.tokens=user.tokens.concat([{access, token}]);
            user.save().then((user)=>{
              resolve(token);
            });
          }
      });
    });
};


UserSchema.statics.findByCredentials=function(email, password){
     var User=this;
     return User.findOne({email:email}).then((user)=>{
       if(!user){
         return Promise.reject();
       }
         return new Promise((resolve, reject)=>{
           bcrypt.compare(password, user.password, (error, result)=>{

             if(result){
               resolve(user);
             }
             else{
               reject();
             }
           });
         });
     }).catch((e)=>{
       return Promise.reject();
     });
   };



UserSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=>{
       bcrypt.hash(user.password, salt, (err, hash)=>{
         user.password=hash;
         next();
       });
    });
  }
  else{
    next();
  }
});




var user=mongoose.model('UsersCollection', UserSchema);
module.exports=user;
