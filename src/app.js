import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const user = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (!username || !avatar) {
        return res.status(400).send("Preencha todos os campos.")
    }

    const newUser = { id: user.length + 1, username, avatar }
    user.push(newUser)

    res.send("OK")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))