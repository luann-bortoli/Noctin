import styles from '../styles/CreateTask.module.css'
import { useState } from 'react'
import axios from 'axios'

interface createTask{
    cancel: () => void;
    update: () => void;
}

export default function CreateTask({cancel, update}: createTask){

    const [showPriority, setShowPriority] = useState(false)

    const [newTitle, setNewTitle] = useState(" ")
    const [newContent, setNewContent] = useState(" ")
    const [newPriority, setNewPriority] = useState(" ")
    const [convertPriority, setConvertPriority] = useState("Low")

    function sendTask(){
        const newTask = {
            "title": newTitle,
            "content": newContent,
            "priority": priorityToNumber()
        }

        axios.post("http://localhost:5000/tasks", newTask)
        .then(
            res => {
                console.log(res.data)
                update()
                cancel()
                }
            )
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
                        <p className={styles.title}>Creating new task</p>
                    </div>

                    <div className={styles.inputContainer}>

                        <div className={styles.field}>
                            <label htmlFor="title">Title</label>
                            <input value={newTitle} onChange={(e)=> setNewTitle(e.target.value)} id='title' type="text"/>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="content">Task</label>
                            <textarea value={newContent} onChange={(e)=> setNewContent(e.target.value)} id='content'/>
                        </div>

                        <div onMouseLeave={()=> setShowPriority(false)} className={styles.field}>
                            <label htmlFor="priority">Priority</label>
                            
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
                            <button onClick={()=> sendTask()}>Create</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}