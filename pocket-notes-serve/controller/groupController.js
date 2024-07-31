const Group = require('../model/groupSchema')

const createGroup = async (req, res) => {
    try {
        const { name, color } = req.body;       
        await Group.create({name, color});
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
    const groupsList = await Group.find().select("-updatedAt")
    res.status(200).json({
        success:true,
        message:"Groups List!",
        groupsList
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

