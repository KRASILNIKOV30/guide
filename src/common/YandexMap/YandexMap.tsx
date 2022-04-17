import { YMaps, Map, GeolocationControl } from 'react-yandex-maps';
import styles from './YandexMap.module.css';

const YandexMap = () => {
    return (
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
    )
}

export default YandexMap