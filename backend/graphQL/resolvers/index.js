import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";

export const resolvers = {
    Query: {
        getAllProducts: async() => {
            try {
                const products = await Product.find({});
                return products;
            } catch (error) {
                throw error;
            }
        },


        filterProducts: async(_, args) => {
            console.log('prod', args);
            try {
                const query = {};
                if (args.display.length !== 0) {
                    query['phone_details.displayType'] = { $regex: args.display.join('|'), $options: 'i' }
                }

                if (args.camera.length !== 0) {
                    query['phone_details.mainCamera'] = { $regex: args.camera.join('|'), $options: 'i' }
                }

                if (args.selfieCamera.length !== 0) {
                    query['phone_details.selfieCamera'] = { $regex: args.selfieCamera.join('|'), $options: 'i' }
                }

                if (args.storage.length !== 0) {
                    query.storage = { $in: args.storage }
                }

                if (args.sensor.length !== 0) {
                    query['phone_details.sensors'] = { $regex: args.sensor.join('|'), $options: 'i' }
                }

                if (args.newPhone !== '' && args.newPhone === 'Yes') {
                    query.new_phone = true
                }

                if (args.officialWarranty !== '' && args.officialWarranty === 'Yes') {
                    query.unofficial_warranty = true
                }

                if (args.price.minValue !== '0') {
                    query.phone_price = { "$gte": parseInt(args.price.minValue), "$lte": parseInt(args.price.maxValue) }
                }

                if (args.size.minValue !== '0') {
                    query.displaySize = { "$gte": parseInt(args.size.minValue), "$lte": parseInt(args.size.maxValue) }
                }

                if (args.batteryCapacity.minValue !== '0') {
                    query.battery_capacity = { "$gte": parseInt(args.batteryCapacity.minValue), "$lte": parseInt(args.batteryCapacity.maxValue) }
                }

                console.log(query)
                const products = await Product.find(query);
                console.log('dd', products.length)
                return products;
            } catch (error) {
                throw error;
            }
        },

        getSingleProduct: async(_, { id }) => {
            try {

                const singleProduct = await Product.findOne({ _id: id }).exec();
                console.log(singleProduct)

                return singleProduct;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        getCartProduct: async(_, { id }) => {
            try {
                const user = await User.findById(id).exec()
                const cart = await Cart.findOne({ user: user, complete: false }).populate({
                    path: 'product',
                    populate: {
                        path: 'product',
                    },
                }).exec()
                return cart
            } catch (err) {
                console.log(error);
                throw err;
            }
        }
    },

    Mutation: {
        addProductToCart: async(_, args) => {
            try {

            } catch (error) {

            }

            // get user
            const user = await User.findById(args.product.userId).exec()

            // get product
            const product = await Product.findById(args.product._id).exec()

            const cart = await Cart.findOne({ user: user, complete: false })

            // Add product when cart is null
            if (cart === null) {
                const cart = new Cart({
                    user: user,
                    total: product.phone_price
                })
                cart.product.push({ product: product, quantity: 1, subTotal: product.phone_price })
                const result = await cart.save();

            } else {
                // Check if there is  exist same product
                const isExist = cart.product.some(item => item.product.toString() === product._id.toString())

                if (isExist && args.product.context === '') {

                    cart.product.map(item => {
                        if (item.product.toString() === product._id.toString()) {
                            item.quantity = item.quantity + 1;
                            item.subTotal = item.quantity * product.phone_price;
                        }
                    })

                }

                // increment if same product exist 

                if (isExist && args.product.context === 'increment') {
                    cart.product.map(item => {
                        if (item.product.toString() === product._id.toString()) {
                            item.quantity = item.quantity + 1;
                            item.subTotal = item.quantity * product.phone_price;
                        }
                    })
                }

                // decrement if same product exist

                if (isExist && args.product.context === 'decrement') {
                    cart.product.map(item => {
                        if (item.product.toString() === product._id.toString()) {
                            if (item.quantity !== 1) {
                                item.quantity = item.quantity - 1;
                            }

                            item.subTotal = item.quantity * product.phone_price;
                        }
                    })


                }

                // Add product if same product does not exit
                if (!isExist) {
                    cart.product.push({ product: product, quantity: 1, subTotal: product.phone_price })
                }

                let cartProd;



                const result = await cart.save().then(item => {
                    cartProd = item.product
                })

                // calculate total price 
                const total = cartProd.reduce((all, { subTotal }) => all + subTotal, 0)

                // query variable for find and update cart total

                const query = { user: user, complete: false }

                const updateCart = await Cart.findOneAndUpdate(query, { total: total }, { new: true })



            }
        }
    }
};