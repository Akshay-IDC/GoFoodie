const express = require('express')
const app = express()
const port = 5000 || process.env.port
const  mongoDB=require('./database');
mongoDB();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://go-foodie.netlify.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-width, Content-Type, Accept"
  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api',require("./Routes/NewUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})