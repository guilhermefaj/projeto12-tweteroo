import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    if (!username || !avatar) {
        return res.status(400).send("Preencha todos os campos.")
    }

    const newUser = { id: users.length + 1, username, avatar }
    users.push(newUser)

    res.send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!users.find((user) => user.username === username)) {
        return res.status(401).send("UNAUTHORIZED")
    }
    if (!username || !tweet) {
        return res.status(400).send("Preencha todos os campos")
    }

    const newTweet = { id: tweet.length + 1, username, tweet }
    tweets.push(newTweet)

    res.send("OK")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))