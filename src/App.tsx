import { YMaps, Map, GeolocationControl } from 'react-yandex-maps';
import './App.css';

const App = () => {
    return (
        <div>
        <YMaps>
            <Map
                defaultState = {{ 
                    center: [56.64, 47.89], 
                    zoom: 13,
                    type: 'yandex#hybrid',  
                }}
                className = 'map'
            >
                <GeolocationControl options={{ float: 'right' }} />
            </Map>
        </YMaps>
        <div className='hide'><h1>Здесть ничего нет</h1></div>
        </div>
    )
}

export { App }