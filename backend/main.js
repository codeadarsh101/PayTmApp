// backend/index.js
const express = require('express');
const cors = require("cors");
const port=3000;
const mainrouter = require("./routes/index");//import

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainrouter);

app.listen(port);
console.log(`server is running at ${port}`);