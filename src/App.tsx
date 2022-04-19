import YandexMap from './common/YandexMap/YandexMap';
import { PopOverTopMenu } from './common/PopOverTopMenu/PopOverTopMenu';
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.main_container}>
            <YandexMap />
            <PopOverTopMenu state = 'halfOpened'/>
        </div>  
    )
}

export { App }