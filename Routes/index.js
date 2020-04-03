const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({ message: "Hello from root GET" });
});

router.post("/", (req, res) => {
    return res.send({ message: "Hello from root POST" });
});

module.exports = router;
