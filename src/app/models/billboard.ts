import mongoose, { Schema } from "mongoose";

const hoursSchema = new Schema({
    start: {
        type: Date,
    },
    end: {
        type: Date,

    }

})

const announcementSceama = new Schema ({
    id : {
        type: String,
    } ,
    date : {
        type: String,
    } ,
    hours : hoursSchema  ,
    img: {
        type: String,
    } ,
    desc: {
        type: String,
    } ,
    title: {
        type: String,
    } ,
    subTitle: {
        type: String,
    } ,
    price: {
        type: Number,
    } ,
},

{
    timestamps:true
})
const billboardSceama = new Schema ({
    announcements:[ announcementSceama ]
},
{
    timestamps:true
})

const Billboard = mongoose.models.billboard || mongoose.model('billboard', billboardSceama) 

export default Billboard