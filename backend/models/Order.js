import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema(
    {
        cart : [
            {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product'
            }
        ]
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        paymentMethod: { type: String, required: true },
        isPaid: { type: Boolean, default: false },
        totalPrice: { type: Number, required: true },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
)

export default Order = mongoose.model('Order', OrderSchema)