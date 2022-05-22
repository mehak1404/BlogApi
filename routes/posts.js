const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const Comments = require("../models/Comments");


router.get("/", async (req, res) => {
  try{

      const listOfPosts = await Posts.findAll({ include: [Likes] });
      res.status(200).json({ listOfPosts: listOfPosts });
  } 
  catch(err){
        res.status(402).json(err);
  } 
});
// get blogs by post id
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
//get post by user id
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

router.post("/create",  async (req, res) => {
    try{

        const post = req.body;
        post.username = req.body.username;
        post.UserId = req.body.UserId;
        await Posts.create(post);
        res.json(post);
        
    }
    catch(err){
        res.status(400).json(err);
    }
    // const post = req.body;
});

//updating title
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
// Delete by post id 
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
// Delete all
router.delete("/", async (req, res) => {
    try{
        await Posts.destroy({ where: { } }).then(res.json("DELETED SUCCESSFULLY"));
      
        
    }
    catch(err){
        res.status(402).json(err);
    }
});

module.exports = router;