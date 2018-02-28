const validator=require('validator');
const jwt=require('jsonwebtoken');
const lodash=require('lodash');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');

var institutionSchema=new mongoose.Schema({
    nameOfInstitution:{
        type:String
    },
    buildings:[{
        name:String,
        currentNumber:Number,
        servingNumber:Number
       }]
});
institutionSchema.statics.findByInstitution=function(institution, building){

  var Institution=this;
  return user.findOne({institution:institution,building:building}).then((currentNumber)=>{
        if(currentNumber){
          return currentNumber;
        }
        else{
          return Promise.reject();
        }
  });

  institution.update({institution:institution,
    building:building}, {$inc:{currentNumber:1}},function(result,err){
    if(err){
      return console.log(err);
    }
  });
};


var institution=mongoose.model('Institutioncollection', institutionSchema);

module.exports=institution;
