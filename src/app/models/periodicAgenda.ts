import mongoose, { Schema } from "mongoose";

const dateTime = new Schema({
    start: {
        type: String,
        required: [true, " please provide start date"],
    },
    end: {
        type: String,
        required: [true, " please provide end date"],

    }
})

const hoursRangeSchema = new Schema({
    start: {
        type: String,
        required: [true, " please provide start date"],
    },
    end: {
        type: String,
        required: [true, " please provide end date"],

    }

})

const practitionerSchema = new Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    membershipId: {
        type: String, 
    }

})
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

})

const activitySchema = new Schema({
    id: {
        type: String,
    },
    date: {
        type: String,
        required: [true, " please provide valid date"],
    },
    name: {
        type: String,
    },

    hoursRange: hoursRangeSchema,

    classOrWorkshop: {
        type: String,

    },

    workshop:workshopSchema,

    workshopId: {
        type: String,

    },
    teacher: {
        type: String,

    },
    location: {
        type: String,

    },
    isCanceled: {
        type: Boolean
    },
    reasonOfCancelation: {
        type: String
    },
    practitioners: [
        practitionerSchema 
    ],

})
const periodicAgendaSceama = new Schema({
    date: dateTime,
    activities: [activitySchema]



},
    {
        timestamps: true
    })

const PeriodicAgenda = mongoose.models.periodic_agenda || mongoose.model('periodic_agenda', periodicAgendaSceama)

export default PeriodicAgenda