import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import YandexMap from '../../common/YandexMap/YandexMap';
import styles from './Map.module.css';

import { PointInfo, State } from '../../model/types';
import { useState } from 'react';

import InfoPlacesList from '../../common/InfoPlacesList/InfoPlacesList';

interface MapProps {
    isTourStarted: boolean
}

const Map = ({ isTourStarted }: MapProps) => {
    const [length, setLength] = useState<number>();
    const [time, setTime] = useState<number>();
    const [isInfoOpened, setIsInfoOpened] = useState(false);

    const [route, setRoute] = useState<Array<PointInfo>>([]);

    const navigate = useNavigate();

    return (
        <div className={styles.preview_map}>
            <div className={styles.top_menu}>
                <div className={styles.header_metric}>Весь маршрут (примерно)</div>
                <div className={styles.metric}>{time !== undefined? time: "-"}, {length !== undefined? length: "-"}</div>
                <Button viewStyle='cancel' onClick={() => navigate("/previewtour")} className={styles.button_close} />
            </div>
            <div className={styles.map_container}>
                <YandexMap routeState={route} getMetrics={(length, time) => {setLength(length); setTime(time)}} />
            </div>

            {
                isTourStarted
                    ? <PopOverTopMenu 
                        state='active'
                        openInfo={() => setIsInfoOpened(true)}
                    />
                    : <PopOverTopMenu 
                        state='editable' 
                        getRoute={(newRoute) => {setRoute(newRoute)}} 
                        openInfo={() => setIsInfoOpened(true)}
                    />
            }
            

            {
                isInfoOpened && <InfoPlacesList close={() => setIsInfoOpened(false)}/>
            }
        </div>
    )
}

const mapStateToProps = (state: State) => {
    return {
        isTourStarted: state.userData.routeState.length > 0
    }
}

export default connect(mapStateToProps)(Map)