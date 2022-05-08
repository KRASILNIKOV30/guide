import YandexMap from './common/YandexMap/YandexMap';
import styles from './App.module.css';
import { connect } from 'react-redux';
import PopOverTopMenu from './common/PopOverTopMenu/PopOverTopMenu';

const App = () => {
    return (
        <div className={styles.main_container}>
            <YandexMap />
            <PopOverTopMenu state="editable"/>
        </div>  
    )
}

export default connect()(App)