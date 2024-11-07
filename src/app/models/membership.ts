import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    type: String,
    entries: Number
})

const membershipsSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        subscription: subscriptionSchema,
        start: Date,
        end: Date,
        isExpired: { type: Boolean },
        paid: { type: Number },
        dateOfPurchase: { type: Date },
    }

)


const Membership = mongoose.models.membership || mongoose.model('membership', membershipsSchema)

export default Membership