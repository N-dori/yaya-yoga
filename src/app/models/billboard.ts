import mongoose, { Schema } from "mongoose";

const hoursSchema = new Schema({
    start: {
        type: Date,
        required: [true, " please provide start date"],
    },
    end: {
        type: Date,

    }

})

const announcementSceama = new Schema ({
    id : {
        type: String,
        required:[true , " please write your full name"]
    } ,
    date : {
        type: String,
        required:[true , " please write your full name"]
    } ,
    hours : hoursSchema  ,
    img: {
        type: String,
        required:[false , " please provide password"]
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