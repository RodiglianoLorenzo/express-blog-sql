const posts = require("../data/posts");
//creazione dei controller per gestire le operazioni sui post (CRUD)

const getAllPosts = (req, res) => {
    res.json(posts);
};

const getPostById = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((item) => item.id === id);

    if (!post) {
        return res.status(404).json({ message: "Post non trovato" });
    }

    res.json(post);
};

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

const patchPost = (req, res) => {
    res.send(`Modifica parziale post ${req.params.id}`);
};

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
