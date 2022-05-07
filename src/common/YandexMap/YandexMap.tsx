import { useEffect, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps';
import styles from './YandexMap.module.css';
import Button from '../Button/Button';
import { useLocation } from '../../core/hooks/useLocation';
import userLocation from './images/userLocation.svg'
import { State } from '../../model/types';

type PointInfo = {
    coordinates: Array<number>;
    state: "default" | "active" | "finished" | "deleted";
}

interface YandexMapProps {
    routeState: Array<PointInfo>
    started: boolean;
}

const YandexMap = ({ routeState, started }: YandexMapProps) => {   
    const mapRef = useRef<any>(null);

    const { x, y, error } = useLocation();

    const CreateRoute = ({ ymaps, route }: any) => {
        const pointsCoordsArray: Array<Array<number>> = [];
        useEffect(() => {
            route.forEach((point: any) => pointsCoordsArray.push(point.coordinates))
            console.log('in ueh')
            ymaps.route(
                pointsCoordsArray,
                {
                    multiRoute: true,
                    routingMode: "pedestrian"
                }
            ).then((route: any) => {
            route.options.set("mapStateAutoApply", true);
            mapRef.current.geoObjects.add(route);
            })
            return () => {}
        }, [ymaps, ...route]);
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
                            iconImageSize: [18, 18]
                        }} />
                    }
                    {
                        started && <ConnectedCreateRoute route = {routeState} />
                    }
                    
                </Map>
            </YMaps> 
        </div>
    )
}

//useMemo

function mapStateToProps(state: State) {
    const routePoints: Array<PointInfo> = [];
    const activeToureIndex = state.tours.findIndex(tour => tour.id === state.userData.selectedTourId);
    state.userData.routeState.forEach(point => {
        const placeIndex = state.tours[activeToureIndex].places.findIndex(place => place.id === point.placeId)
        routePoints.push({
            coordinates: [state.tours[activeToureIndex].places[placeIndex].coordinates.x, state.tours[activeToureIndex].places[placeIndex].coordinates.y],
            state: point.state
        })
    })
    return {
        routeState: routePoints,
        started: state.userData.started
    }
}

export default connect(mapStateToProps)(YandexMap)