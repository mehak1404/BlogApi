const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models");

// // Routers

app.get("/", (req, res)=>{
    res.status(200).json("This is blogapi");
});
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

const usersRouter = require("./routes/Users");
app.use("/user", usersRouter);


 
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});