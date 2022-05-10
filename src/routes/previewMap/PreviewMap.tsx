import { connect } from 'react-redux';
import Button from '../../common/Button/Button';
import YandexMap from '../../common/YandexMap/YandexMap';
import styles from './PreviewMap.module.css';

const PreviewMap = () => {
    return (
        <div className={styles.preview_map}>
            <div className={styles.top_menu}>
                <div className={styles.header_metric}>Весь маршрут (примерно)</div>
                <div className={styles.metric}>50 минут, 2 км</div>
                <Button viewStyle='cancel' to="/previewtour" onClick={() => {}} className={styles.button_close} />
            </div>
            <div className={styles.map_container}>
                <YandexMap />
            </div>
        </div>
    )
}

export default connect()(PreviewMap)