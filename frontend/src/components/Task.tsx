import styles from '../styles/Task.module.css'

interface TaskProps{
    id: number;
    title: string;
    content: string;
    priority: number;
    created: string;

}

export default function Task({id, title, content, priority, created}: TaskProps){
    
    return(
        <>
            <div className={styles.container}>
                
                <div className={styles.titleContainer}>
                    <p className={styles.title}>{title}</p>
                </div>

                <div className={styles.content}>
                    <p className={styles.desc}>{content}</p>
                </div>

                <div className={styles.actionContainer}>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="3 2.75 18.28 18.25"><path d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z"/></svg>
                        Edit
                    </button>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 3 16 18"><path d="M7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z"/></svg>
                        Delete
                    </button>
                </div>

            </div>
        </>
    )
}