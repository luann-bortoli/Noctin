import styles from '../styles/EditTask.module.css'
import { useState } from 'react'
import axios from 'axios'

interface EditTask{
    title: string;
    content: string;
    priority: number;
    id: number;
    cancel: () => void;
    update: () => void;
}

export default function EditTask({cancel, update, title, content, priority, id}: EditTask){

    const [showPriority, setShowPriority] = useState(false)

    const [newTitle, setNewTitle] = useState(title)
    const [newContent, setNewContent] = useState(content)
    const [newPriority, setNewPriority] = useState(priority)
    const [convertPriority, setConvertPriority] = useState("Low")

    const updateTask = (id: number) =>{
        const thisTitle = newTitle
        const thisContent = newContent
        const thisPriority = convertPriority

        axios.put(`http://localhost:5000/tasks/${id}`, {title: thisTitle, content: thisContent, priority: priorityToNumber()})
        .then(() => update())
        .then(()=> cancel())
        .catch(err => console.log(err))
    }

    function priorityToNumber(){
        switch (convertPriority){
            case "High":
                return 3
            
            case "Medium":
                return 2

            case "Low":
                return 1
            
            default:
                return ""
        }
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.content}>

                    <div className={styles.titleContainer}>
                        <p className={styles.title}>Editing task</p>
                    </div>

                    <div className={styles.inputContainer}>

                        <div className={styles.field}>
                            <label htmlFor="title">New title</label>
                            <input placeholder={title} value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} id='title' type="text"/>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="content">New task</label>
                            <textarea placeholder={content} value={newContent} onChange={(e)=> setNewContent(e.target.value)} id='content'/>
                        </div>

                        <div onMouseLeave={()=> setShowPriority(false)} className={styles.field}>
                            <label htmlFor="priority">New priority</label>
                            
                            <button onClick={()=> setShowPriority(!showPriority)}>{convertPriority}</button>
                            {showPriority && (
                                <div className={styles.prioritySelect}>
                                    <ul>
                                        <li><button onClick={()=> (setConvertPriority("High"), setShowPriority(false))}>High</button></li>
                                        <li><button onClick={()=> (setConvertPriority("Medium"), setShowPriority(false))}>Medium</button></li>
                                        <li><button onClick={()=> (setConvertPriority("Low"), setShowPriority(false))}>Low</button></li>
                                    </ul>
                                </div>
                            )}

                        </div>

                        <div className={styles.buttonContainer}>
                            <button onClick={cancel}>Cancel</button>
                            <button onClick={()=> updateTask(id)}>Edit</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}