import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import YandexMap from '../../common/YandexMap/YandexMap';
import styles from './PreviewMap.module.css';

import { PointInfo } from '../../model/types';
import { useState } from 'react';

import InfoPlacesList from '../../common/InfoPlacesList/InfoPlacesList';

const PreviewMap = () => {
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

            <PopOverTopMenu state='editable' getRoute={(newRoute) => {setRoute(newRoute)}}/>

            {
                isInfoOpened && <InfoPlacesList close={() => setIsInfoOpened(false)}/>
            }
        </div>
    )
}

export default connect()(PreviewMap)