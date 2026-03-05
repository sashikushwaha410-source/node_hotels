const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

router.post('/',async(req,res)=>{
    try {
        const data=req.body // Assuming the request body contains the person data
        // Create a new Person document using the Mongoose model
        const newPerson=new Person(data);

        // save the new person to the database

        const response =await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// get method to get the person
router.get('/',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Ineternal Server Error'});
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;// extract the work type from the url parameter
        if(workType=='chef'||workType=='manager'|| workType=='waiter'){
            const response =await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
         }
         else{
         res.status(404).json({error:'Invalid work type'});

         }

     }
     catch(err){
     console.log(err);
     res.status(500).json({error:'Internal server error'});
     } 
     })
     router.put('/:id',async(req,res)=>{
        try{
            const personId=req.params.id; //Extract the id from the url parameter
            const updatedPersonData=req.body; // updater data for the person
            const response  =await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new:true, // return the updated document
                runValidators:true,
            })
            if(!response){
                return res.status(404).json({error:'Person not found'});
            }
            console.log('data updated');
            res.status(200).json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:'Internal server Error'});
        }
     })
     router.delete('/:id',async(req,res)=>{
        try{
            const personId=req.params.id; // extract the person's id from the url parameter
            // suuming you hava a person model
            const response=await Person.findByIdAndDelete(personId);
            if(!response){
                return res.status(404).json({error:'Person not found'});

            }
            console.log('data delete');
            res.status(200).json({message:'person deleted successfully'});
            
        }
        catch(err){
            console.log(err);
            res.status(500).json({error:'internal server error'});
        }
     })

     module.exports=router;