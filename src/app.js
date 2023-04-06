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
    if (typeof username !== "string" || typeof avatar !== "string") {
        return res.status(400).send("Preencha os campos corretamente.")
    }

    const newUser = { id: users.length + 1, username, avatar }
    users.push(newUser)

    res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!users.find((user) => user.username === username)) {
        return res.status(401).send("UNAUTHORIZED")
    }
    if (!username || !tweet) {
        return res.status(400).send("O campo não pode estar vazio.")
    }
    if (typeof tweet !== "string") {
        return res.status(400).send("Preencha o campo corretamente.")
    }

    const newTweet = { id: tweets.length + 1, username, tweet }
    tweets.push(newTweet)

    res.status(201).send("OK")
})

app.get("/tweets", (req, res) => {
    const reqTweets = [];

    for (let i = 0; i < 10; i++) {
        if (tweets[i]) {
            const profile = users.find((user) => user.username === tweets[i].username);
            const singleTweet = {
                username: tweets[i].username,
                avatar: profile ? profile.avatar : null,
                tweet: tweets[i].tweet
            };
            reqTweets.push(singleTweet);
        }
    }

    res.send(reqTweets);
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))