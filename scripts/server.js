const express = require('express');
const app = express ()

app.use("/styles", express.static("./styles"))
app.use("/scripts", express.static("./scripts"))
app.use("/pages", express.static("./pages"))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: "." });
})

app.get('/game', (req, res) => {
    res.sendFile('../pages/game.html', { root: "." });
})

app.listen(3000, () => console.log("Listening on port 3000"))