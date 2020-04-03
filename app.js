const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/config");

const url = config.bd_string;
const options = {
    poolSize: 5,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", err => {
    console.log("Erro na conexão com o DB", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("DB desconectado");
});

mongoose.connection.on("connected", () => {
    console.log("Conectado");
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require("./Routes/index");
const usersRoute = require("./Routes/users");

app.use("/", indexRoute);
app.use("/users", usersRoute);

app.listen(3000);

module.exports = app;
