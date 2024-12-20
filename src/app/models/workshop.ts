import mongoose, { Schema } from "mongoose";

const workshopSchema = new Schema({
    id: {
        type: String,
    },
    activityId: {
        type: String,
    },
    title: {
        type: String,
    },
    subTitle: {
        type: String,
    },
    imgUrl:{
        type: String,
    },
    desc: {
        type: String,
    },
    date: {
        type: String,
    },
    activityStartTime: {
        type: String,
    },
    activityEndTime: {
        type: String,
    },
    lastDateForRegistration: {
        type: String,
    },
    price:{
        type:String || Number
    },
    activityLocation:{
        type:String 
    }

})

const Workshop = mongoose.models.workshop || mongoose.model('workshop', workshopSchema) 

export default Workshop