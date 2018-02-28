var express= require('express');
var lodash=require('lodash');
var bodyPaser=require('body-parser');//takes json and coversts to an obecject
var objectid=require('mongodb').ObjectId;
var mongoose=require('./mongoose/mongoose');
var UserSchema=require('./models/users');
var InstitutionSchema=require('./models/institutions');

var app=express();

app.use(bodyPaser.json());

app.post('/signup', (req, res)=>{
  var body=lodash.pick(req.body, ['email', 'password']);
  var user=new UserSchema(body);
  // user.save().then(()=>{
  //    return user.generateToken();
  // }).then((token)=>{
  //   console.log(user);
  //     console.log(token);
  //   res.header('x-auth',token).send(user);
  //
  // }).catch((e)=>{
  //   res.status(400).send(e);
  // });
  user.save().then(()=>{
    return user.generateToken().then((token) => {
      console.log(token);
      res.header('x-auth',token).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    });
  }).catch((e)=>{
    res.status(400).send(e);
  });

});

app.post('/login', (req, res)=>{
  console.log(req);

  body=lodash.pick(req.body, ['email', 'password']);
  console.log(body);

  userSchema.findByCredentials('body.email','body.password').then((user)=>{
      return user.generateToken();
  }).then((token)=>{
     res.header('x-auth', token).send(user)
  }).catch((e)=>{
        res.status(401).send()
  });
});


// app.get('/currentNumber/:Institution/:building',(req, res)=>{
//    var user=new UserSchema()
//    var body=req.params;
//    User.findByInstitution(body.Institution, body.building).then((currentNumber)=>{
//      res.send(currentNumber);
//      return currentNumber;
//    }).then((currentNumber)=>{
//       //  user.findOne({institution:body.Institution, building:body.building}).thrn
//    }).catch((e)=>{
//      res.status(400).send();
//    });
// });

app.listen(3000,()=>{
  console.log('server starting');
});
