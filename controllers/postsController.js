const posts = require("../data/posts");
const connection = require("../database/db");
//creazione dei controller per gestire le operazioni sui post (CRUD)


// index per restituire la lista di tutti i post, restituisce un array di oggetti con i dati dei post
const getAllPosts = (req, res) => {
    //Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
    const sql = "SELECT * FROM posts";
    connection.query(sql, (err, results) => {
        console.log(err, 'the is a error');

        if (err) {
            console.error("Errore durante la query:", err);
            return res.status(500).json({ message: "Errore del server" });
        }
        res.json(results);
    });

};

//getPostById per restituire un post in base all'id, se il post non esiste restituisce un messaggio di errore, altrimenti restituisce il post
const getPostById = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((item) => item.id === id);

    if (!post) {
        return res.status(404).json({ message: "Post non trovato" });
    }

    res.json(post);
};

//createPost per creare un nuovo post, prende i dati dal body della richiesta e li aggiunge alla lista dei post, restituisce il post creato con status 201 (Created)
const createPost = (req, res) => {
    const newId = posts[posts.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: req.body.image,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
};

//updatePost per modificare un post in base all'id, se il post non esiste restituisce un messaggio di errore, altrimenti aggiorna il post con i nuovi dati e restituisce il post aggiornato
const updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((item) => item.id === id);

    if (!post) {
        res.status(404)

        return res.json({ message: "Post non trovato" })
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
    post.image = req.body.image;

    console.log(post);

    res.json(post);

};

//patchpost per modificare solo alcuni campi del post, ad esempio solo il titolo o solo il contenuto
const patchPost = (req, res) => {
    res.send(`Modifica parziale post ${req.params.id}`);
};

//deletePost per eliminare un post in base all'id, se il post non esiste restituisce un messaggio di errore, altrimenti elimina il post e restituisce una risposta con status 204 (No Content)
const deletePost = (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Post non trovato" });
    }

    posts.splice(index, 1);
    console.log("Lista post aggiornata:", posts);
    res.status(204).send();
};



module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    patchPost,
    deletePost,
};
