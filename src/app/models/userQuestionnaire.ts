import mongoose, { Schema } from "mongoose";

const userQuestionnaireSceama = new Schema ({
   
    firstName : {
        type: String,
    } ,
    lastName :  {
        type: String,
    }  ,
    israelid: {
        type: String,
    } ,
    gender: {
        type: String,
    } ,
    dayBirth: {
        type: String,
    } ,
    monthBirth: {
        type: String,
    } ,
    yearBirth: {
        type: String,
    } ,
    occupation: {
        type: String,
    } ,
    address: {
        type: String,
    } ,
    phone: {
        type: String,
    } ,
    comments: {
        type: String,
    } ,



},
{
    timestamps:true
})

const UserQuestionnaire = mongoose.models.userQuestionnaire || mongoose.model('userQuestionnaire', userQuestionnaireSceama) 

export default UserQuestionnaire