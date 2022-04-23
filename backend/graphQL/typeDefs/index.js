import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
    role: String
  }

  type PhoneDetails {
    model: String
    released: String
    displayType: String
    displaySize: String
    displayRes: String
    mainCamera: String
    selfieCamera: String
    os: String
    cpu: String
    gpu: String
    ram: String
    internal_storage: String
    external: String
    battery: String
    sensors: String
  }

  type Products {
    id: ID
    name: String
    speciality: [String]
    phone_images: [String]
    used_phone: Boolean
    new_phone: Boolean
    official_warranty: Boolean
    unofficial_warranty: Boolean
    gaming: Boolean
    phone_link: String
    phone_title: String
    phone_price: String
    youtube_embed: String
    ram: String
    brand: String
    storage: String
    seller_name: String
    seller_address: String
    seller_contact: String
    phone_details: PhoneDetails
  }

  type CartProd {
    product: Products
    quantity: String
    subTotal: String
  }

  type Cart {
    id: ID
    user: User
    product: [CartProd]
    total: String
    complete: Boolean
    text: String
  }

  # *****************

  input productInput {
    userId: String
    _id: String
    phone_images: [String]
    phone_title: String
    phone_price: String
    context: String
  }

  input rangeValue {
    minValue: String
    maxValue: String
  }

  type Query {
    getALlUsers: [User]

    getAllProducts: [Products]
    getSingleProduct(id: String): Products
    getCartProduct(id: String): Cart
    filterProduct(
      display: [String]
      camera: [String]
      selfieCamera: [String]
      ram: rangeValue
      storage: rangeValue
      size: rangeValue
      price: rangeValue
      battery: rangeValue
      sensor: [String]
      newPhone: [String]
      officialWarranty: [String]
    ): [Products]
  }

  type Mutation {
    addProductToCart(product: productInput): Cart
    # deleteCartProduct(id:String)
  }
`;
