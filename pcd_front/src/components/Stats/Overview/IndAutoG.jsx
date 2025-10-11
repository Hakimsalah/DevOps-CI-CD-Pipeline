import styles from '../../../assets/css/Stats/Overview/IndAutoG.module.css'
export const IndAutoG = () => {
    return(
        <div className={styles.bigContainer}>
            <div className= {styles.title}>Indications de l'autogreffe</div>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    
                    <div className={styles.titleContainer}>Caractéristiques des patients autogreffés</div>
                    <div className={styles.lis}>
                        <ul>
                            <li>Sex-ratio: 1.4</li>
                            <li>Age limite pour l'autogreffe: 60
                                and (LH/LNH), 65 ans (MM)
                            </li>
                            <li>Age médian: 49 ans (8-65 ans)</li>

                        </ul>
                    </div>
                </div>
                <div className={styles.subContainer}>
                    
                    <div className={styles.titleContainer}>Caractéristiques des patients allogreffés</div>
                    <div className={styles.lis}>
                        <ul>
                            <li>Sex-ratio: 1.5</li>
                            <li>
                                Age médian: 23 ans (6 mois - 50 ans)
                            </li>
                            <li>Inférieur au égal à 18 ans: (32%)</li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
      
    )
  }

