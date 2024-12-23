import mongoose, { Schema } from "mongoose";
import { NULL } from "sass";

const userSceama = new Schema ({
    name : {
        type: String,
        required:[true , " please write your full name"]
    } ,
    email :  {
        type: String,
        required:[true , " please provide valid email"],
        unique:true,
    }  ,
    password: {
        type: String,
        required:[false , " please provide password"]
    } ,
    isNewUser: {
        type: Boolean,
    } ,
    healthDeclaration: {
        type: String,
    } ,
    userQuestionnaireId: {
        type: String,
    } ,
    memberships: [ { type: Schema.Types.ObjectId, ref: "Membership" } ] 
     ,
    worshopTickets: [ { type: Schema.Types.ObjectId, ref: "Membership" } ] 
     ,
    isAdmin : Boolean ,



},
{
    timestamps:true
})

const User = mongoose.models.user || mongoose.model('user', userSceama) 

export default User