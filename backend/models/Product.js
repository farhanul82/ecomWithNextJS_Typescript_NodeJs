import mongoose from 'mongoose'

const PhoneDetailsSchema = new mongoose.Schema({
    model: { type: String },

    released: { type: String },
    displayType: { type: String },
    displaySize: { type: String },
    displayRes: { type: String },
    mainCamera: { type: String },
    selfieCamera: { type: String },
    selfieCamera: { type: String },
    os: { type: String },
    cpu: { type: String },
    gpu: { type: String },
    ram: { type: String },
    internal_storage: { type: String },
    external: { type: String },
    battery: { type: String },
    sensors: { type: String },

})

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },

    speciality: {
        type: [String],
    },
    phone_images: {
        type: [String],
    },
    used_phone: { type: Boolean },
    new_phone: { type: Boolean },
    official_warranty: { type: Boolean },
    unofficial_warranty: { type: Boolean },
    gaming: { type: Boolean },
    phone_link: { type: String },
    phone_title: { type: String },
    phone_price: { type: Number, required: true },
    battery_capacity: { type: Number, default: 0 },
    displaySize: { type: Number, default: 0 },
    youtube_embed: { type: String },
    brand: { type: String },
    ram: { type: String },
    storage: { type: String },
    seller_name: { type: String },
    seller_address: { type: String },
    seller_contact: { type: String },
    phone_details: {
        type: PhoneDetailsSchema
    }


}, {
    timestamps: true,
})

const Product = mongoose.model('Product', ProductSchema)
export default Product