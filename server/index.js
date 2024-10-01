const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./config/database.js');
const authRouter = require('./routers/authRouter.js');
const postRouter = require('./routers/postRouter.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use('/', authRouter);
app.use('/', postRouter);
const port = 5000;

database();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
