const express = require('express');
const app = express();
const postsRoutes = require('../routes/posts');
const notfoundHandler = require('../middlewares/notFound');
const errorHandler = require('../middlewares/errorHandler');

const port = process.env.PORT || 3001;

app.use(express.json());

//console.log(process.env.DB_USER);


app.get("/", (req, res) => {
    res.send("working server");
});

app.use("/posts", postsRoutes);

//middleware per gestire gli errori 
app.use(errorHandler);

//middleware per gestire le richeste a risorse non esisteniti
app.use(notfoundHandler);

app.listen(port, () => {
    console.log(`server listen on https://localhost:${port}`);
});