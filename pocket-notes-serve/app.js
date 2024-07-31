const express = require('express');
const cors = require('cors');
const bodyParser=require("body-parser");
const app = express();
const groupRouter = require('./router/groupRouter')
const notesRouter = require('./router/noteRouter')
const path = require("path");
// const peopleRouter = require('./router/peopleMailRouter')
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode;    
     err.message=err.message||"Internal Server Error"
     res.status(err.statusCode).json({
        success:false,
        message:err.message
    })}
)
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
  const corsOptions = {
    origin: "*",
    credentials: true, 
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

//router setup
app.use('/group',groupRouter);
app.use('/notes',notesRouter);

app.get("/test",async(req,res)=>{    
    res.status(200).json({
      message:"Serve is up!"
    });
});

app.use(express.static(path.join(__dirname,'../build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../build/index.html'))
})



module.exports = app;