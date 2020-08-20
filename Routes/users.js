const express = require("express");
const router = express.Router();
const users = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createUserToken = userId => {
    return jwt.sign({ id: userId }, config.jwt_pass, {
        expiresIn: config.jwt_expires_in
    });
};

router.get("/", async (req, res) => {
    try {
        const usersList = await users.find({});
        return res.send(usersList);
    } catch (err) {
        return res.status(500).send({ error: "Erro na consulta de usuários" });
    }
});

router.post("/create", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send({ error: "Dados insuficientes!" });

    try {
        if (await users.findOne({ email }))
            return res.status(400).send({ error: "Usuário já registrado!" });

        const user = await users.create(req.body);
        user.password = undefined;

        return res.status(201).send({ user, token: createUserToken(user._id) });
    } catch (err) {
        return res.status(500).send({ error: "Erro ao buscar usuário!" });
    }
});

router.post("/auth", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send({ error: "Dados insuficientes!" });

    try {
        const user = await users.findOne({ email }).select("+password");
        if (!user)
            return res.status(400).send({ error: "Usuário inexistente!" });

        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok)
            return res.status(401).send({ error: "Erro ao autenticar!" });

        user.password = undefined;
        return res.send({ user, token: createUserToken(user._id) });
    } catch (err) {
        return res.status(500).send({ error: "Erro ao buscar usuário!" });
    }
});

module.exports = router;