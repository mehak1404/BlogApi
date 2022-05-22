const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");



router.post("/register", async (req, res) => {
  
    try{

        const { username, password } = req.body;
        bcrypt.hash(password, 10).then((hash) => {
          Users.create({
            username: username,
            password: hash,
          });
          res.json("SUCCESS");
        });
    }
    catch(err){
      res.status(402).json(err);
    }
});

router.post("/login", async (req, res) => {
    try{

        const { username, password } = req.body;
      
        const user = await Users.findOne({ where: { username: username } });
      
        if (!user) res.json({ error: "User Doesn't Exist" });
      
        bcrypt.compare(password, user.password).then(async (match) => {
          if (!match) res.json({ error: "Wrong Username And Password Combination" });
      
        
          res.json({ username: username, id: user.id });
        });
    }
    catch(err){
      res.status(402).json(err);
    }
});


router.get("/basicinfo/:id", async (req, res) => {
    try{

        const id = req.params.id;
    
      const basicInfo = await Users.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
    
      res.json(basicInfo);
    }
    catch(err){
      res.status(402).json(err);
    }
});

router.put("/changepassword", async (req, res) => {
  
  try{

      const { oldPassword, newPassword } = req.body;
      const user = await Users.findOne({ where: { username: req.user.username } });
    
      bcrypt.compare(oldPassword, user.password).then(async (match) => {
        if (!match) res.json({ error: "Wrong Password Entered!" });
    
        bcrypt.hash(newPassword, 10).then((hash) => {
          Users.update(
            { password: hash },
            { where: { username: req.user.username } }
          );
          res.json("SUCCESS");
        });
      });
  }
  catch(err){
    res.status(402).json(err);
  }
});

module.exports = router;