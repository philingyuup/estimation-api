//import npm packages
import express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan')

//import middleware
//------------

//import routes
var estimationRouter = require('./src/routes/estimation');
//------------

const app: express.Application = express();

//simple third-party app.use()
app.use(morgan(':method :url :status - :response-time ms')) //for logs
app.use(express.json())
app.use(cors({
    origin: [/localhost:[0-9]+$/, /naya\.studio$/],
    credentials: true
}));

//---------


//add routes and middleware to app
app.use("/estimate", estimationRouter)
//------------

const port = process.env.PORT!;

mongoose.connect(process.env.MONGO_ENDPOINT!, {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, ()=>{
    console.log("Connected to Database")
});


app.listen(port, () => {
    console.log(`App started on port ${port}`);
});


//test route
app.get("/", (req : express.Request, res : express.Response) => {
    res.status(200).send("Hello World");
});