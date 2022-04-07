import mongoose from 'mongoose'

const CartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        subTotal: { type: Number }
    }],
    total: { type: Number },
    complete: { type: Boolean, default: false }
}, {
    timestamps: true,
})

const Cart = mongoose.model('Cart', CartSchema)
export default Cart