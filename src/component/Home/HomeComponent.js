import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import GroupNote from '../GroupNote/GroupNote';
import Styles from './HomeComponent.module.css';
import CreateGroup from '../CreateGroup/CreateGroup';
import { MainviewComponent } from '../Mainview/MainviewComponent';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGroup as createGroupApi, createNote, getAllGroup, getNotesById } from '../../services/apis';
const HomeComponent = () => {
  const [notes, setnotes] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedNote, setSelectedNote] = useState("")
  const [createGroup, setCreateGroup] = useState(false)
  const [isMobileView,setIsMobileView]=useState(true);
  const getData = async () => { 
    // let notes = await localStorage.getItem("notes")
    let notes = await getAllGroup();
    console.log(notes);
    if (notes&& notes?.groupsList) {
      //let data = JSON.parse(notes)
      setnotes(notes.groupsList)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const selectGroup = async (groupId,group,color) => {
    const res=await getNotesById(groupId);
    console.log(res)  
    setSelectedNote(res?.notes)
    setSelectedGroup({groupId,group,color});
    if(window.innerWidth<=480){
      setIsMobileView(false);
    }      
  
  }
  const openDialog = () => {
    setCreateGroup(true)
  }

  const closeDialog=()=>{
    setCreateGroup(false);
  }

  const createGroupfun=async(data)=>{
         const res=await createGroupApi(data)
         if(res && res?.success){
          const result = await getAllGroup();
          if(result && result?.success){
            setnotes(result.groupsList)
          }
         }        
          }

  const addnewNote=async(note)=>{    
      const res=await createNote({notes:note, groupId:selectedGroup?.groupId});
      if(res && res?.success){
        const res=await getNotesById(selectedGroup?.groupId);
      
        setSelectedNote(res?.notes)
        
      }
       //setnotes(allGroups);
           
  }

  return <div>    
    <div className={Styles.pocket_notes}>
      {isMobileView&&<Sidebar notes={notes} selectGroup={selectGroup} selectedGroup={selectedGroup} addGroup={openDialog} />}
      
      { selectedGroup?(<GroupNote addnewNote ={addnewNote} setIsMobileView={setIsMobileView} setSelectedGroup={setSelectedGroup} selectedNote={selectedNote} selectedGroup={selectedGroup}/>):
      (<MainviewComponent/>)}

    </div>
    <div className={Styles.create_group}>
      {
        createGroup && <CreateGroup onClose={closeDialog} createGroup={createGroupfun}/>
      }
    </div>    
  </div>
}

export default HomeComponent;