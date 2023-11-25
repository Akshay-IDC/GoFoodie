const mongoose = require('mongoose');
const mongoURI="mongodb://goFoodmern:food1234@ac-plqqwde-shard-00-00.f9e7ycr.mongodb.net:27017,ac-plqqwde-shard-00-01.f9e7ycr.mongodb.net:27017,ac-plqqwde-shard-00-02.f9e7ycr.mongodb.net:27017/food_items?ssl=true&replicaSet=atlas-pxwvtr-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB= async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result)=>{
        if(err) console.log("some problem",err)
        else{  
            console.log("connected")
            const fetched_data=await mongoose.connection.db.collection("items");
            const data= await fetched_data.find({}).toArray();  
            global.items=data;
            //console.log(global.items); 
            const foodCategory= await mongoose.connection.db.collection("category");
            const categoryData= await foodCategory.find({}).toArray();
            global.category=categoryData;  
    }
    });    
};

module.exports=mongoDB;
