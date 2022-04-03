import { YMaps, Map } from 'react-yandex-maps';

const App = () => {
    return (
        <YMaps>
            <Map
                defaultState = {{ 
                    center: [55.75, 37.57], 
                    zoom: 9,
                    type: 'yandex#hybrid',  
                }}
            />
        </YMaps>
    )
}

export { App }