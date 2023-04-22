//api documentation
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';
//packages imports
import express from "express";
import dotenv from 'dotenv'
import cors from 'cors';
import morgan from "morgan";
import 'express-async-errors';
//security packages
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
//files imports
import connectDB from "./config/db.js";
//routes import
import authRoutes from './routes/authRoutes.js'
import testRoutes from './routes/testRoutes.js';
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from './routes/userRoutes.js';
import jobsRoute from './routes/jobsRoute.js';

//dotenv config
dotenv.config();

//MongoDb connetion
connectDB();

//Swagger api config
//Swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info : {
            title: "Job Portal Application",
            description: "Node Express Job Portal Application"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ['./routes/*.js']
}

const spec = swaggerDoc(options);

//rest object
const app = express();

//middlewares
app.use(helmet()); // for headers
app.use(xss()); //cross site scripting attacks 
app.use(mongoSanitize()); // mongo db protection
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//route
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoute);

//homeroute root
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec));

//validation middleware
app.use(errorMiddleware)

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> {
    console.log(`Node Server Running on PORT ${PORT}`);
})