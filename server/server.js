require("dotenv").config({ path: __dirname + "/.env" });
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

require('./startup/config')();
require('./startup/db')();
require('./startup/route')(app);
require('./utils/cron-job/reminder')

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`This code is running on port ${port} ...`));