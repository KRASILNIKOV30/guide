import { connect } from 'react-redux';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import { State, Tour } from '../../model/types';
import styles from './PreviewTour.module.css';

interface PreviewTourProps {
    tour: Tour;
}

const PreviewTour = ({ tour }: PreviewTourProps) => {

    return (
        <div className={styles.preview_tour_container}>
            <div className={styles.top}></div>

            <div className={styles.header}>
                <div 
                    className = {styles.backgroundImage}
                    style = {{"backgroundImage": `url(${tour.image})`}}
                > 
                </div>
            </div>
            <PopOverTopMenu state='preview'/>
            <div className={styles.bot}></div>
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