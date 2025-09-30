const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.API_PORT || 8000;

app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).send({
    message: "Doctor Appointments API",
  });
});

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
