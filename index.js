const express = require("express");
const bodyParser = require('body-parser')
require('dotenv').config();


const roleRouter = require('./Routes/roleRoute')
const userRouter = require('./Routes/userRoute')
const authenticateRouter = require('./Routes/authenticateRoute')
const moduleRouter = require('./Routes/moduleRoute')
const formationRouter = require('./Routes/formationRoute')
const formation_moduleRouter = require('./Routes/formation_moduleRoute')
const evaluationRouter = require('./Routes/evaluationRoute')
const evaluationTypeRouter = require('./Routes/evaluation_typeRoute')

require('./Models/module');
require('./Models/formation');
require('./Models/formation_module');
require('./Models/formation_module')

const app = express();

const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.use("/User", userRouter);
app.use("/Role", roleRouter);
app.use("/authenticate", authenticateRouter);
app.use("/Module", moduleRouter);
app.use("/Formation", formationRouter);
app.use("/Formation_Module", formation_moduleRouter);
app.use("/Evaluation", evaluationRouter);
app.use("/Evaluation_Type", evaluationTypeRouter);


module.exports = app;