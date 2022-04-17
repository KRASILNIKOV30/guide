import YandexMap from './common/YandexMap/YandexMap';
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.main_container}>
            <YandexMap />
        </div>  
    )
}

export { App }