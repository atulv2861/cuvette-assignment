import React, { useState } from 'react'
import Styles from "./GroupList.module.css";
const GroupCard = ({ color,group,groupId, selectedGroup, selectGroup }) => {
  // const [isSelectedGrp,setIsSelectedGrp]=useState();
  let notesName = group.split(" ");
  let notesSymbol = "";  
  let notesNameLength = notesName.length;
  if( notesNameLength===1){
    notesSymbol=notesName[0].charAt(0)+notesName[0].charAt(1);
  }else{
    let count=0;
    for (let data of notesName) {
      notesSymbol += data.charAt(0);
      count++;
      if(count>2)
        break;
    }
  }
  
  notesSymbol = notesSymbol.toUpperCase(); 
 
  const handleSelectGroup=(groupId,group,color)=>{
      selectGroup(groupId,group,color);      
      //setIsSelectedGrp(groupId);
  };

  return <div 
  className={Styles.group_card} 
  onClick={() => handleSelectGroup(groupId,group,color)} 
  style={{backgroundColor:(selectedGroup && selectedGroup?.groupId)===`${groupId}`?'lightgrey':'', borderRadius:'5px'}}
  >
    <div style={{backgroundColor:`${color}`}}>{notesSymbol}</div>
    <b>{group}</b>
  </div>
}

export default GroupCard