import { useRef } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import styles from './YandexMap.module.css';
import Button from '../Button/Button';
import { useLocation } from '../../core/hooks/useLocation';
import userLocation from './images/userLocation.svg'

const YandexMap = () => {   
    const mapRef = useRef<any>(null);

    const { x, y, error } = useLocation();
    if (error) {
        console.log(error)
    }

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
                    instanceRef = {(ref) => {mapRef.current = ref;}}
                >
                    <div className={styles.button_container}>
                        <div className={styles.zoom_container}>
                            <Button
                                viewStyle='plus'
                                onClick={() => mapRef.current.setZoom(mapRef.current.getZoom() + 1, { duration: 250 })}
                            />
                            <Button
                                viewStyle='minus'
                                onClick={() => mapRef.current.setZoom(mapRef.current.getZoom() - 1, { duration: 250 })}
                            />
                        </div>
                        <Button 
                            viewStyle='back_to_location'
                            onClick={() => mapRef.current.setCenter([x, y], 15, { duration: 250 })}
                        />
                    </div>
                    {
                        (x !== undefined && y !== undefined) && <Placemark geometry={[x, y]} options={{
                            iconLayout: 'default#image',
                            iconImageHref: userLocation,
                            iconImageSize: [18, 18]
                        }} />
                    }     
                </Map>
            </YMaps> 
        </div>
    )
}

export default connect()(YandexMap)