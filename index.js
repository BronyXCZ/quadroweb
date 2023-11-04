const app = require('express')();
const port = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.send("Hello world!");
})

app.listen(port, () => {
    console.log("App up at port " + port)
})