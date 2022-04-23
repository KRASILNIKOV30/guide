import { Ref, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Button, ZoomControl } from 'react-yandex-maps';
import styles from './YandexMap.module.css';

const YandexMap = () => {
    const [zoomLevel, setZoomLevel] = useState(13);
    
    const mapRef = useRef<any>(null);
    const setMapRef = useCallback((instance: Ref<any>) => {
        mapRef.current = instance;
    }, []);

    return (
        <div className={styles.map_container}>
            <YMaps
                query = {{
                    apikey: '69b35853-10e5-483a-928c-fb414a02a744'
                }}
            >
                <Map
                    defaultState = {{ 
                        center: [56.64, 47.89], 
                        zoom: 13,
                        controls: []
                    }}
                    className = {styles.map_container}
                    instanceRef = {setMapRef}
                >
                    <Button 
                        data={{
                            title: 'Plus',
                            conent: 'Plus'
                        }}
                        options={{
                            selectOnClick: false
                        }}
                        onClick = {() => {
                            setZoomLevel(zoomLevel + 0.5);
                            mapRef.current.setZoom(zoomLevel, { duration: 250 })
                        }}
                    /> 
                </Map>
            </YMaps> 
        </div>
    )
}

export default connect()(YandexMap)