import mongoose, { Schema } from "mongoose";
const dateTime  = new Schema ({
    start :  {
        type: String,
        required:[true , " please provide start date"],
    } ,
    end :  {
        type: String,
        required:[true , " please provide end date"],
        
    } 
})
const hoursRangeSchema = new Schema({
    start :  {
        type: String,
        required:[true , " please provide start date"],
    } ,
    end :  {
        type: String,
        required:[true , " please provide end date"],
        
    } 

})
const activitySchema =  new Schema ({
    date :  {
        type: String,
        required:[true , " please provide valid email"],
    }  ,
    name :  {
        type: String,
    }  ,
    hoursRange :  hoursRangeSchema ,
    classOrWorkshop :  {
        type: String,
       
    }  ,
    teacher :  {
        type: String,
        
    }  ,
    location :  {
        type: String,
       
    }  ,
    practitioners :  [
      { type: String}
     ] ,

})
const periodicAgendaSceama = new Schema ({
    date:dateTime,
    activities:[activitySchema]



},
{
    timestamps:true
})

const PeriodicAgenda = mongoose.models.periodic_agenda || mongoose.model('periodic_agenda', periodicAgendaSceama) 

export default PeriodicAgenda