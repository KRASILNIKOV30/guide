import { useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';
import styles from './YandexMap.module.css';
import Button from '../Button/Button';
import { useLocation } from '../../core/hooks/useLocation';
import userLocation from './images/userLocation.svg'
import { PointInfo } from '../../model/types';


interface YandexMapProps {
    routeState: Array<PointInfo>;
    getMetrics?: (length: number, time: number) => void
}

const YandexMap = ({ routeState, getMetrics }: YandexMapProps) => {   
    const mapRef = useRef<any>(null);

    const { x, y, error } = useLocation();

    const CreateRoute = ({ ymaps, route, x, y }: any) => {
        const indexOfRoute = useRef<number>(-1);
        const pointsCoordsArray: Array<Array<number>> = [];

        useEffect(() => {
            /*if (error) {
                x = 56.64;
                y = 47.89;
            }
            if (x !== undefined && y !== undefined) {
                pointsCoordsArray.push([x, y]);
            }*/
            navigator.geolocation.getCurrentPosition(
                (crd) => {
                    pointsCoordsArray.push([crd.coords.latitude, crd.coords.longitude]);
                    route.forEach((point: any) => pointsCoordsArray.push(point.coordinates))
                    ymaps.route(
                        pointsCoordsArray,
                        {
                            multiRoute: true,
                            routingMode: "pedestrian",
                        }
                    ).then((route: any) => {
                        route.options.set("mapStateAutoApply", true);
                        mapRef.current.geoObjects.splice(indexOfRoute.current, 1);
                        mapRef.current.geoObjects.add(route);
                        indexOfRoute.current = mapRef.current.geoObjects.indexOf(route);
                        if (getMetrics) {
                            getMetrics(route._jsonView._activeRoute.events.params.context.properties._data.distance.text, route._jsonView._activeRoute.events.params.context.properties._data.duration.text);
                        }
                    })
                }, 
                (err) => {
                }, 
                {
                    enableHighAccuracy: true, 
                    timeout: 5000, maximumAge: 0
                }
            )
            /*route.forEach((point: any) => pointsCoordsArray.push(point.coordinates))
            ymaps.route(
                pointsCoordsArray,
                {
                    multiRoute: true,
                    routingMode: "pedestrian",
                }
            ).then((route: any) => {
                route.options.set("mapStateAutoApply", true);
                mapRef.current.geoObjects.splice(indexOfRoute.current, 1);
                mapRef.current.geoObjects.add(route);
                indexOfRoute.current = mapRef.current.geoObjects.indexOf(route);
                if (getMetrics) {
                    getMetrics(route._jsonView._activeRoute.events.params.context.properties._data.distance.text, route._jsonView._activeRoute.events.params.context.properties._data.duration.text);
                }
            })*/
            return () => {}
        }, [ymaps, route]);
        return ( <> </> )
    }

    const ConnectedCreateRoute = useMemo(() => {
        return withYMaps(CreateRoute, true, ['route'])
    }, [routeState])
    

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
                    options = {{
                        yandexMapDisablePoiInteractivity: true
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
                            iconImageSize: [18, 18],
                            pixelRendering: 'static'
                        }} />
                    }
                    {
                        (x !== undefined && y !== undefined) && <ConnectedCreateRoute route = {routeState} x = {x} y = {y} />     
                    }
                     
                </Map>
            </YMaps> 
        </div>
    )
}


export default connect()(YandexMap)