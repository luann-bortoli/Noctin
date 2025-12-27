import styles from '../styles/Header.module.css'

export default function Header(){
    return(
        <>
            <div data-aos="fade-down" data-aos-delay="2500" className={styles.container}>
                <div className={styles.content}>
                    <ul>
                        <li><a href="#homeSection">Home</a></li>
                        <li><a href="#tasksSection">Tasks</a></li>
                        <li><a href="#">More</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}