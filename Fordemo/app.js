// This is my first Api...!!

import express from 'express';
const app = express();

app.get("/", (req, res) => {
    res.send("Jay Jay Shree Radhe..!!");
});

app.listen(1100, () => {
    console.log("Server started..!!!");
});
