import express from "express";
import http from 'http'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import { errorHandler, notFoundHandler } from "./middlewares/common/errorHandler.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productsRouter.js";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphQL/typeDefs/index.js";
import { resolvers } from "./graphQL/resolvers/index.js";
import cookieParser from 'cookie-parser'




const app = express()
const server = http.createServer(app);
const apolloServer = new ApolloServer({ typeDefs, resolvers, playground: true, })

await apolloServer.start();

await apolloServer.applyMiddleware({ app })



dotenv.config();


// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));




app.get('/', (req, res) => {
    res.send('Home page')
})

// routing setup
app.use("/auth", userRouter);
app.use("/products", productRouter);



// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`app listening to port ${process.env.PORT}`);
});