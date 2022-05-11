import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import YandexMap from '../../common/YandexMap/YandexMap';
import styles from './PreviewMap.module.css';

const PreviewMap = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.preview_map}>
            <div className={styles.top_menu}>
                <div className={styles.header_metric}>Весь маршрут (примерно)</div>
                <div className={styles.metric}>50 минут, 2 км</div>
                <Button viewStyle='cancel' onClick={() => navigate("/previewtour")} className={styles.button_close} />
            </div>
            <div className={styles.map_container}>
                <YandexMap />
            </div>

            <PopOverTopMenu state='editable' />
        </div>
    )
}

export default connect()(PreviewMap)