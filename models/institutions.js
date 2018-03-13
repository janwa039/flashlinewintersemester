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
        ticketNumber:{
          type:Number,
          default:99
        },
        currentNumber:Number,
        servingNumber:Number,
        ticket:[{
        type:Number,
        user:String,
      }]
    }]
});


// institutionSchema.methods.currentNumberMethod=function(idinstitution, idbuilding){
//   institutionSchema.findOne({idinstitution:idinstitution, idbuilding:idbuilding}).then((information)=>{
//          console.log(information);
//   })
// }

var institution=mongoose.model('Institutioncollection', institutionSchema);

module.exports=institution;
