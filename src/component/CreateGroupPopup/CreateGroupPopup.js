import React, { useState, useEffect, useRef } from 'react';
import Styles from './CreateGroupPopup.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateGroupPopup = ({handleCreateGroup, onClose }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const dialogRef = useRef(null);

  const submitHandler = () => {
    const data = {
      name: text,
      color: color
    }
    let isValid=true;
    if(!data.name.trim().length){
      isValid=false;
      toast('Please enter the group name!');
    }
    if(!data.color.trim().length){
      isValid=false;
      toast('Please choose anyone color!')
    }
    if(isValid){
      handleCreateGroup(data);
      onClose();
    }
    
  }
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return <div className={`${Styles.popup} "popup"`} ref={dialogRef}>    
      <h3 style={{marginTop:'-10px'}}>Create new group</h3>    
       <label htmlFor="groupname">Group Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
       <input
        type='text' 
        id="groupname"
        autoFocus={true}
         className={Styles.input_group} 
         onChange={(e)=>setText(e.target.value)} 
         value={text} 
         name="groupname" 
         max={15}
         placeholder='Enter group name'/><br/>
        <div className={Styles.color_group}>
        <label htmlFor="favcolor">Choose Color&nbsp;&nbsp;&nbsp;</label>
      
        <div className={`${Styles.color} ${color=='#4edd27'&&Styles.selectedColor}`} style={{backgroundColor:'#4edd27'}} onClick={()=>setColor('#4edd27')}></div>
        <div className={`${Styles.color} ${color=='#FFA500'&&Styles.selectedColor}`} style={{backgroundColor:'#FFA500'}} onClick={()=>setColor('#FFA500')}></div>
        <div className={`${Styles.color} ${color=='#6dcedf'&&Styles.selectedColor}`} style={{backgroundColor:'#6dcedf'}} onClick={()=>setColor('#6dcedf')}></div>
        <div className={`${Styles.color} ${color=='#964B00'&&Styles.selectedColor}`} style={{backgroundColor:'#964B00'}} onClick={()=>setColor('#964B00')}></div>
        <div className={`${Styles.color} ${color=='#0000FF'&&Styles.selectedColor}`} style={{backgroundColor:'#0000FF'}} onClick={()=>setColor('#0000FF')}></div>
        <div className={`${Styles.color} ${color=='#c4649c'&&Styles.selectedColor}`} style={{backgroundColor:'#c4649c'}} onClick={()=>setColor('#c4649c')}></div>
        </div >
  <div className={Styles.create_group_btn}><button onClick={e=>{submitHandler();}}>Create</button></div>      
  <ToastContainer/>  
  </div >
}

export default CreateGroupPopup