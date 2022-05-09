import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { State, Tour } from '../../model/types';
import styles from './PreviewTour.module.css';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';

interface PreviewTourProps {
    tour: Tour;
}

const PreviewTour = ({ tour }: PreviewTourProps) => {

    const navigate = useNavigate();

    return (
        <div className={styles.preview_tour_container}>

            <div className={styles.header}>
                <div 
                    className = {styles.background_image}
                    style = {{"backgroundImage": `url(${tour.image})`}}
                > </div>
                <Button viewStyle='back' className={styles.button_back} onClick={() => {navigate("/")}}/>

                <div 
                    className = {styles.tour_image}
                    style = {{"backgroundImage": `url(${tour.image})`}}
                > </div>

                <div className={styles.tour_name}>{tour.name}</div>

                <div className = {styles.tour_info}>
                    <div className={styles.info_text}>Прочитать описание</div>
                    <Button viewStyle='info_white' className={styles.button_info} onClick={() => {}} />
                </div>

                <Button text="Посмотреть на карте" viewStyle="main" onClick={() => {}} className={styles.button_look} />

            </div>

            <PopOverTopMenu state='preview' />
        </div>
    )
}

const mapStateToProps = (state: State) => {
    const tourIndex = state.tours.findIndex(tour => tour.id === state.userData.selectedTourId);
    return {
        tour: state.tours[tourIndex]
    }
}

export default connect(mapStateToProps)(PreviewTour);