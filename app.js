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
  user.save().then(()=>{
    return user.generateToken().then((token) => {
      res.header('x-auth',token).send(user);
    }).catch((e)=>{
      res.status(400).send(e);
    });
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.post('/login', (req, res)=>{
  var body=lodash.pick(req.body, ['email', 'password']);

  UserSchema.findByCredentials(body.email,body.password).then((user)=>{
      console.log(user);
      return user.generateToken().then((token)=>{

        res.header('x-auth', token).send(user);
      });
  }).catch((e)=>{
    res.status(401).send(e);
});
});

app.post('/institutioncreation', (req, res)=>{
  var body=lodash.pick(req.body, ['nameOfInstitution']);
  var institution=new InstitutionSchema(body);

  institution.save().then(()=>{
     console.log('institution saved');
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.get('/institution', (req, res)=>{
   InstitutionSchema.find({}).then((institution)=>{
     if(!institution)
     {
       return Promise.reject();
     }
     console.log(institution);
     res.send(institution);
   }).catch((e)=>{
     res.status(400).send();
   });
});

// app.post('/building/:institution', (req, res)=>{
//   var idinstitution=req.params.institution;
//   var body=lodash.pick(req.body, ['name']);
//
//    InstitutionSchema.findOne({idinstitution:idinstitution}).then((theinstitution)=>{
//    }
// });

// app.get('/currentNumber/:institution/:building', (req,res)=>{
//
//        var idinstitution=req.params.institution;
//        var idbuilding=req.params.building;
//       InstitutionSchema.currentNumberMethod(idinstitution, idbuilding).then((currentNumber)=>{
//           res.send(currentNumber);
//       }).catch((e)=>{
//         res.status(400).send();
//       });
// });

app.listen(3000,()=>{
  console.log('server starting');
});
