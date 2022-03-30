import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

export const resolvers = {
    Query: {
        getAllProducts: async() => {
            try {
                const products = await Product.find();
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


    },

    Mutation: {
        addProductToCart: async(_, args) => {

            const cart = await Cart.find({ product: args })
            console.log(cart)
        }
    }
};