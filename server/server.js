const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

require('./startup/config')();
require('./startup/db')();
require('./startup/route')(app);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`This code is running on port ${port} ...`));