import styles from './TourSelect.module.css';
import { connect } from "react-redux"
import Button from '../../common/Button/Button';

const TourSelect = () => {
    return (
        <div className={styles.tour_select}>
            <div className={styles.top}></div>

            <div className={styles.header_container}>
                <div className={styles.header_top}>
                    <h1 className={styles.header_text}> Туры от Гида </h1>
                    <Button viewStyle='info' onClick={() => {}}/>
                </div>
                <div className={styles.header_bot}>
                    <div className={styles.placemark_image}></div>
                    <div className={styles.town_name}> Йошкар-Ола </div>
                </div>
            </div>

            <div className={styles.tour_info_container}>
                <h2 className={styles.tour_name}>Йошкар-Ола за 1 день</h2>
                <h3 className={styles.tour_info}>Постмотрите самые важные места Йошки всего за 1 день.</h3>
            </div>

            <div className={styles.tour_images_container}></div>

            <div className={styles.slider_container}></div>

            <div className={styles.bot}></div>
        </div>
    )
}

export default connect()(TourSelect)