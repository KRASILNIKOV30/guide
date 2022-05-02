import YandexMap from './common/YandexMap/YandexMap';
import styles from './App.module.css';
import { connect } from 'react-redux';
import PopOverTopMenu from './common/PopOverTopMenu/PopOverTopMenu';

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className={styles.main_container}>
                
                <YandexMap />
                <PopOverTopMenu state = 'halfOpened'/>
            
            </div>  
        </BrowserRouter>
    )
}

export default connect()(App)