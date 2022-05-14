import { connect } from 'react-redux';
import { State, Tour } from '../../model/types';
import Button from '../Button/Button';
import styles from './InfoPlacesList.module.css'

interface InfoPlacesListProps {
    tour: Tour;
    close: () => void;
}

const InfoPlacesList = ({ tour, close }: InfoPlacesListProps) => {

    return (
        <div className={styles.info_places_list}>
            <Button viewStyle='delete' onClick={close} className={styles.button_close} />
            <div className={styles.info_container}>
                <div className={styles.general_tour_info}>
                    <div className={styles.tour_info_header}>Тур: {tour.name}</div>
                    <div className={styles.description}>{tour.description}</div>
                </div>
                {
                    tour.places.map(place => 
                        <div className={styles.place_card} key={place.id}>
                            <div className={styles.general_info}>
                                <div className={styles.place_name}>
                                    <div className={styles.place_number}>{tour.places.findIndex(placeFinding => placeFinding.id === place.id) + 1}</div>
                                    {place.name}
                                </div>
                                <div className={styles.description}>{place.description}</div>
                            </div>
                            <div className={styles.place_image} style={{"backgroundImage": `url(${place.image})`}}>
                            
                            </div>
                        </div>    
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state: State) => {
    const tourIndex = state.tours.findIndex(tour => tour.id === state.userData.selectedTourId);
    return {
        tour: state.tours[tourIndex]
    }
}


export default connect(mapStateToProps)(InfoPlacesList);