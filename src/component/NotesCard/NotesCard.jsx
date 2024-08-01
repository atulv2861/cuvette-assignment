import React from 'react';
import Styles from './NotesCard.module.css';

const NotesCard = ({notes}) => {
  return <div className={Styles.note_card}>
   <div style={{wordWrap:'break-word'}}>{notes?.notes}
   <div className={Styles.notes_timestamp}>{`${new Date(notes?.createdAt).toDateString().substring(4)}. ${new Date(notes?.createdAt).toLocaleTimeString().substring(0, 5)} ${new Date(notes?.createdAt).toLocaleTimeString().substring(8)}  `}</div>
</div> 
  </div>
}

export default NotesCard