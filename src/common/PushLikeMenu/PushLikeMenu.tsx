import { connect } from 'react-redux';
import styles from './PushLikeMenu.module.css'

interface PushLikeMenuProps {
    yandexClicked: () => void,
    appleClicked: () => void,
    googleClicked: () => void,
    onClick: () => void
}

const PushLikeMenu = ({ yandexClicked, appleClicked, googleClicked, onClick }: PushLikeMenuProps) => {
    return (
        <div className={styles.push_like_menu}>
            <div className={styles.links_container}>
                <div className={styles.links_header}>Построить маршрут</div>
                    <div 
                        className={styles.link}
                        onClick={() => {
                            yandexClicked();
                            onClick()
                        }}
                    >
                        Яндекс.Карты
                    </div>  
                    <div 
                        className={styles.link}
                        onClick={() => {
                            googleClicked();
                            onClick()
                        }}
                    >
                        Google Карты
                    </div>    
            </div>
            <div className={styles.cancel} onClick = {() => {onClick()}}>Отмена</div>
        </div>
    )
}

export default connect()(PushLikeMenu)