import axios from 'axios';
const url='http://localhost:8080';

export const createGroup= async (value)=>{
    try{
        const {data}= await axios.post(`/group/createGroup`,value);
        return data;
    }catch(err){
        console.log(err);
    }
    
}

export const getAllGroup=async ()=>{
    try{
        const {data} = await axios.get(`/group/getAllGroup`);
        return data;
    }catch(err){
        console.log(err);
    }
    
}

export const createNote=async(val)=>{
    try{
        const {data}=await axios.post(`/notes/createNote`,val);
        return data;
    }catch(err){
        console.log(err);
    }
    
}

export const getNotesById=async(id)=>{
    try{
        const {data}= await axios.get(`/notes/getNotes/${id}`);
        return data;
    }catch(err){
        console.log(err);
    }
    
}