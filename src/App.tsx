import { YMaps, Map, GeolocationControl } from 'react-yandex-maps';
import styles from './App.module.css';

import Button from './common/Button/Button';
import CheduleCard from './common/CheduleCard/CheduleCard';
import InputField from './common/InputField/InputField';

const App = () => {
    return (
        <div className={styles.main_container}>
            {/* 
            <YMaps
                query = {{
                    apikey: '69b35853-10e5-483a-928c-fb414a02a744'
                }}
            >
                <Map
                    defaultState = {{ 
                        center: [56.64, 47.89], 
                        zoom: 13
                    }}
                    className = {styles.map}
                >
                    <GeolocationControl options={{ float: 'right' }} />
                </Map>
            </YMaps>
            */}
            <Button viewStyle='main' text='Текст' onClick={() => {}}/>
            <Button viewStyle='secondary' text='Текст' onClick={() => {}}/>
            <Button viewStyle='add' onClick={() => {}}/>
            <Button viewStyle='delete' onClick={() => {}}/>
            <Button viewStyle='delete_outline' onClick={() => {}}/>
            <Button viewStyle='hint' onClick={() => {}}/>
            <Button viewStyle='back' onClick={() => {}}/>
            <Button viewStyle='cancel' onClick={() => {}}/>
            <Button viewStyle='location' onClick={() => {}}/>
            <Button viewStyle='plus' onClick={() => {}}/>
            <Button viewStyle='minus' onClick={() => {}}/>
            <Button viewStyle='back_to_location' onClick={() => {}}/>
            <CheduleCard day='Пн' timeStart='8:00' timeEnd='20:30' workDay={true}/>
            <CheduleCard day='Вт' workDay={false}/>
            <div className={styles.input_container}>
                <InputField placeholder='Текст' onKeyUp={() => {}}/>
            </div>
        </div>
        
    )
}

export { App }