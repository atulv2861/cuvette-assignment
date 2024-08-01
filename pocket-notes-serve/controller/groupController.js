const Group = require('../model/groupSchema')

const createGroup = async (req, res) => {
    try {
        const { name, color } = req.body;       
        const result=await Group.create({name, color});

        if(!result){
            return res.status(400).json({
                success: false,                   
                message:"Something went wrong!"            
            });
        }
        res.status(201).json({
            success: true,                   
            message:"Group created successfully!"            
        });
    } catch (error) {           
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
const allGroup = async(req,res)=>{
 try {
    const groupList = await Group.find().select("-updatedAt");
    if(!groupList){
        return res.status(400).json({
            success:false,
            message:"Something went wrong!",
        });
    }
    res.status(200).json({
        success:true,
        message:"Groups List!",
        groupList
    })
 } catch (error) {
    console.log(error)
    return res.status(400).json({
        success:false,
        message:error.message,
      });
 }
}
module.exports = { 
    allGroup,
    createGroup
 }

