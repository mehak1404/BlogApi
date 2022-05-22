const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");


router.get("/", async (req, res) => {
  try{

      const listOfPosts = await Posts.findAll({ include: [Likes] });
      const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
      res.status(200).json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
  } 
  catch(err){
        res.status(402).json(err);
  } 
});

router.get("/byId/:id", async (req, res) => {
    try{

        const id = req.params.id;
        const post = await Posts.findByPk(id);
        res.json(post);
    }
    catch(err){
        res.status(402).json(err);
    }
});

router.get("/byuserId/:id", async (req, res) => {
    try{

        const id = req.params.id;
        const listOfPosts = await Posts.findAll({
        where: { UserId: id },
        include: [Likes],
        });
      res.json(listOfPosts);
    }
    catch(err){
        res.status(402).json(err);
    }
});

router.post("/",  async (req, res) => {
    try{
        post.username = req.user.username;
        post.UserId = req.user.id;
        await Posts.create(post);
        res.json(post);
        
    }
    catch(err){
        res.status(402).json(err);
    }
    const post = req.body;
});

router.put("/title", async (req, res) => {
    try{

        const { newTitle, id } = req.body;
        await Posts.update({ title: newTitle }, { where: { id: id } });
        res.json(newTitle);
    }
    catch(err){
        res.status(402).json(err);
    }
});

router.put("/postText", async (req, res) => {
    try{

        const { newText, id } = req.body;
        await Posts.update({ postText: newText }, { where: { id: id } });
        res.json(newText);
    }
    catch(err){
        res.status(402).json(err);
    }
});

router.delete("/:postId", async (req, res) => {
    try{

        const postId = req.params.postId;
        await Posts.destroy({
          where: {
            id: postId,
          },
        });
      
        res.json("DELETED SUCCESSFULLY");
    }
    catch(err){
        res.status(402).json(err);
    }
});

module.exports = router;