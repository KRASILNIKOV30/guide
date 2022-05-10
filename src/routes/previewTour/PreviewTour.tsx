import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { State, Tour } from '../../model/types';
import styles from './PreviewTour.module.css';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import { useState } from 'react';

interface PreviewTourProps {
    tour: Tour;
}

const PreviewTour = ({ tour }: PreviewTourProps) => {

    const [isInfoOpened, setIsInfoOpened] = useState(false);

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

                <div className={styles.tour_name} >{tour.name}</div>

                <div className = {styles.tour_info_click} onClick={() => setIsInfoOpened(true)} >
                    <div className={styles.info_text}>Прочитать описание</div>
                    <Button viewStyle='info_white' className={styles.button_info} onClick={() => {}} />
                </div>

                <Button text="Посмотреть на карте" viewStyle="main" to="/previewmap" onClick={() => {}} className={styles.button_look} />

            </div>

            <PopOverTopMenu state='preview' />
            {
                isInfoOpened && <InfoPlacesList tour={tour} close={() => setIsInfoOpened(false)} />
            }

        </div>
    )
}

interface InfoPlacesListProps {
    tour: Tour;
    close: () => void;
}

const InfoPlacesList = ({ tour, close }: InfoPlacesListProps) => {

    return (
        <div className={styles.info_places_list}>
            <Button viewStyle='delete' onClick={close} className={styles.button_close} />
            <div className={styles.info_container}>
                <div className={styles.general_info}>
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

export default connect(mapStateToProps)(PreviewTour);