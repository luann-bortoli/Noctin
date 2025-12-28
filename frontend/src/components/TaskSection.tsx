import styles from '../styles/TaskSection.module.css'
import Task from './Task'
import CreateTask from './CreateTask'


import { useState, useEffect } from 'react'
import axios from 'axios'

interface Task{
        id: number;
        title: string;
        content: string;
        priority: number;
        created: string;
    }

export default function TaskSection(){

    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [priority, setPriority] = useState(1)

    const [order, setOrder] = useState("Priority (Highest first)")
    const [showOrder, setShowOrder] = useState(false)

    const [showCreate, setShowCreate] = useState(false)


    const fetchTasks = () =>{
        axios.get<Task[]>("http://localhost:5000/tasks")
        .then(res => setTasks(res.data))
        .catch(err => console.log(err))
    }

    function deleteTask(id: Number){
        axios.delete(`http://localhost:5000/tasks/${id}`)
        .then(res =>
            {console.log(res.data), 
            fetchTasks()})
        .catch(err => console.log(err))
    }


    useEffect(()=>{
        fetchTasks( )
    },[])

    return(
        <>
            {showCreate &&(
                <CreateTask update={()=> fetchTasks()} cancel={()=>setShowCreate(false)}/>
            )}

            

            <div id='tasksSection' className={styles.container}>
                <div className={styles.content}>

                    <div className={styles.actionContainer}>

                        <div className={styles.searchContainer}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
                            </svg>
                            
                            <input className={styles.searchInput} type="text" />

                            <div className={styles.searchButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 20 20">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <g id="SVGRepo_iconCarrier"> <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ffffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>
                                </svg>
                                <p>Search</p>
                            </div>
                        </div>
                        <div onMouseLeave={()=> setShowOrder(false)}  className={styles.orderContent}>
                        <button onClick={()=> setShowOrder(!showOrder)} className={styles.orderInput}>{order}</button>
                        
                        {showOrder &&
                        <div className={styles.orderContainer}>
                            <ul>
                                <li><button onClick={()=> {setOrder("Priority (Highest first)"), setShowOrder(false)}}>Priority (Highest first)</button></li>
                                <li><button onClick={()=> {setOrder("Priority (Lowest first)"), setShowOrder(false)}}>Priority (Lowst first)</button></li>
                                <li><button onClick={()=> {setOrder("Priority"), setShowOrder(false)}}>Newest</button></li>  
                                <li><button onClick={()=> {setOrder("Oldest"), setShowOrder(false)}}>Oldest</button></li>
                            </ul>  
                        </div>}
                        </div>

                    </div>

                    <div className={styles.taskContainer}>
                        <div onClick={()=> setShowCreate(true)} className={styles.createTask}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3 18 18"><path fill="#ffffff" d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z"/></svg>
                        </div>
                        {tasks.map((task)=> (
                            <div key={task.id} className={styles.taskItem}>
                                <Task updateTask={()=> fetchTasks()} deleteTask={()=> deleteTask(task.id)} id={task.id} title={task.title} content={task.content} priority={task.priority} created={task.created} />
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </>
    )
}