import styles from '../styles/Hero.module.css'

export default function Hero(){

    const desc = ("getting things done.").split("")

    return(
        <>
            <div id="homeSection" className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.mainText}>
                        <div data-aos="zoom-in" data-aos-delay="300" className={styles.title}>
                            <p>Noctin</p>
                        </div>
                        <div className={styles.desc}>
                            {desc.map((word, index)=>(
                                <div className={styles.descWord}>
                                    <p data-aos="zoom-in-left" data-aos-delay={1000 + (index * 50)}>{word}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div data-aos="fade-up" data-aos-delay="2500" className={styles.buttonContainer}>
                        <a href='#tasksSection'>Start</a>
                    </div>

                </div>
            </div>
        </>
    )
}