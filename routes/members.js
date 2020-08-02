
const express = require('express');
const router = express.Router(); 
const Joi = require('joi');
const cors = require('cors');
router.use(cors()) ;

const members = [

    {  id:1   ,   name:"Ahmed"    ,  job:"Js Developer/PEGA Developer" ,  },
    {  id:2   ,   name:"Karim"    ,  job:"Java Developer/PEGA Developer"  },
    {  id:3   ,   name:"Ibrahim"  ,  job:"Java Developer/PEGA Developer"  },
    {  id:4   ,   name:"Mazen"    ,  job:"UX Designer/PEGA Developer"     },
    {  id:5   ,   name:"Amr"      ,  job:"Java Developer/PEGA Developer"  },
    {  id:6   ,   name:"Omar"     ,  job:"Java Developer/PEGA Developer"  },
    {  id:7   ,   name:"Hossam"   ,  job:"Java Develper/PEGA Developer"    },
    {  id:8   ,   name:"Eslam"    ,  job:"Java Developer/PEGA Developer"  },
    {  id:9   ,   name:"Omnia"    ,  job:"HR Manager/PEGA Develper"       },
    {  id:10  ,   name:"Darwish"  ,  job:"Project Manager/PEGA Develper"  }
 ];


 router.get('/' , (req , res)=>{
    res.send(members);
});

router.get('/:id' , (req , res)=>{

  

       const id =  +req.params.id ;
       const member =    members.find((element)=>{
        return  element.id === id ;
     }) 
     if(member){

        res.send(member);
     }else{
         res.status(404).send("this member is not found in the team." + typeof(member));
         
     }

});

router.post('/',(req , res)=>{

 const bodySchema = Joi.object({
           
    name : Joi.string().required().min(3) , 
    job: Joi.string().required().min(3)

 });

 const validation = bodySchema.validate(req.body);

 if(validation.error){
    res.status(400).send(validation.error);
    return
 }

 
 res.send(validation);

  const member = {
      id : data.length + 1 ,
      name : req.body.name , 
      job : req.body.job , 
  }


  data.push(member);
  res.send(member);
  

});


router.put("/:id",(req , res)=>{

const bodySchema = Joi.object({
   name: Joi.string().required(),
   job:Joi.string().required()
})

const validation = bodySchema.validate(req.body);

if(validation.error){
  return res.status(400).send(validation.error);
   
}

const member =   members.find(element=>{
  return element.id === +req.params.id ;
});

member.name = req.body.name ;
member.job = req.body.job ;

res.send(member);

})

router.delete('/:id',(req , res)=>{
  
const member  =  members.find((el)=>{
   return el.id === +req.params.id
 })

 if(!member){
   return res.status(404).send("there is no member with that ID");
 }else{
    const index = data.indexOf(member);
    members.splice(index,1) ;
    res.send(member) ;
 }


  
})


module.exports = router
