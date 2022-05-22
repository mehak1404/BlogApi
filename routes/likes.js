const express = require("express");
const router = express.Router();
const { Likes } = require("../models");

router.post("/", async (req, res) => {
  
  try{
    const  PostId  = req.body.PostId;
    const UserId = req.body.UserId;
  
    const found = await Likes.findOne({
      where: { PostId: PostId, UserId: UserId },
    });
    if (!found) {
      await Likes.create({ PostId: PostId, UserId: UserId });
      res.json({ liked: true });
    } else {
      await Likes.destroy({
        where: { PostId: PostId, UserId: UserId },
      });
      res.json({ liked: false });
    }
  }catch(err){
      res.status(400).json(err);
  }
   
});

module.exports = router;