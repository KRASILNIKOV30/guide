import YandexMap from './common/YandexMap/YandexMap';
import styles from './App.module.css';
import { connect } from 'react-redux';

const App = () => {
    return (
        <div className={styles.main_container}>
            <YandexMap />
        </div>  
    )
}

export default connect()(App)