import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import YandexMap from '../../common/YandexMap/YandexMap';
import styles from './PreviewMap.module.css';

import { PointInfo } from '../../model/types';
import { useState } from 'react';

const PreviewMap = () => {
    const [route, setRoute] = useState<Array<PointInfo>>([]);

    const navigate = useNavigate();

    return (
        <div className={styles.preview_map}>
            <div className={styles.top_menu}>
                <div className={styles.header_metric}>Весь маршрут (примерно)</div>
                <div className={styles.metric}>50 минут, 2 км</div>
                <Button viewStyle='cancel' onClick={() => navigate("/previewtour")} className={styles.button_close} />
            </div>
            <div className={styles.map_container}>
                <YandexMap routeState={route}/>
            </div>

            <PopOverTopMenu state='editable' getRoute={(newRoute) => {setRoute(newRoute)}}/>
        </div>
    )
}
//67.22306%
//89.378%
export default connect()(PreviewMap)