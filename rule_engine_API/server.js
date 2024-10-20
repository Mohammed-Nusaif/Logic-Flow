const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/routes/Rulerouter');
const connection = require('./src/config/config');
// const { config } = require('dotenv');




connection()


const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
}));
app.use(bodyParser.json());
app.use(express.json())
app.use('/api', router)
// config.env = config()
app.listen(port, console.log(`server is running ${port}`))
