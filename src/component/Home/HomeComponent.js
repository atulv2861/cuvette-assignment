import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import CreateNotes from '../CreateNotes/CreateNotes';
import Styles from './HomeComponent.module.css';
import CreateGroupPopup from '../CreateGroupPopup/CreateGroupPopup';
import { NotesPanel } from '../NotesPanel/NotesPanel';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGroup as createGroupApi, createNote, getAllGroup, getNotesById } from '../../services/apis';
const HomeComponent = () => {
  const [groupList, setGroupList] = useState();
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedNotes, setSelectedNotes] = useState("")
  const [createGroup, setCreateGroup] = useState(false)
  const [isMobileView,setIsMobileView]=useState(true);
  const getData = async () => { 
    let allGroups = await getAllGroup();    
    if (allGroups&& allGroups?.groupsList) {      
      setGroupList(allGroups.groupsList)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const handleSelectedGroup = async (groupId,group,color) => {
    const res=await getNotesById(groupId);
    console.log(res)  
    setSelectedNotes(res?.notes)
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
            setGroupList(result.groupsList)
          }
         }        
          }

  const addnewNote=async(note)=>{    
      const res=await createNote({notes:note, groupId:selectedGroup?.groupId});
      if(res && res?.success){
        const res=await getNotesById(selectedGroup?.groupId);      
        setSelectedNotes(res?.notes)
        
      }          
  }

  return <div>    
    <div className={Styles.pocket_notes}>
      {isMobileView&&<Sidebar groupList={groupList} handleSelectedGroup={handleSelectedGroup} selectedGroup={selectedGroup} addGroup={openDialog} />}
      
      { selectedGroup?(<CreateNotes addnewNote ={addnewNote} setIsMobileView={setIsMobileView} setSelectedGroup={setSelectedGroup} selectedNotes={selectedNotes} selectedGroup={selectedGroup}/>):
      (<NotesPanel/>)}

    </div>
    <div className={Styles.create_group}>
      {
        createGroup && <CreateGroupPopup onClose={closeDialog} createGroup={createGroupfun}/>
      }
    </div>    
  </div>
}

export default HomeComponent;