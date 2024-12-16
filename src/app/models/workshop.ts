import mongoose, { Schema } from "mongoose";

const workshopSchema = new Schema({
    id: {
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

})

const Workshop = mongoose.models.workshop || mongoose.model('workshop', workshopSchema) 

export default Workshop