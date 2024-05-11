import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { State, Tour } from '../../model/types';
import styles from './PreviewTour.module.css';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import { useState } from 'react';
import InfoPlacesList from '../../common/InfoPlacesList/InfoPlacesList';

interface PreviewTourProps {
    tour: Tour;
    tourIndex: number;
}

const PreviewTour = ({ tour, tourIndex }: PreviewTourProps) => {

    const [isInfoOpened, setIsInfoOpened] = useState(false);

    const navigate = useNavigate();

    const getBgColor = () => {
        switch (tourIndex) {
            case 0: {
                return('#B5D77E')
            }
            case 1: {
                return('#659BD2')
            }
            case 2: {
                return('#FF8E7E')
            }
        }
    }

    return (
        <div className={styles.preview_tour_container}>

            <div className={styles.header}>
                <div 
                    className = {styles.background_image}
                    style = {{backgroundColor: getBgColor()}}
                > </div>
                <Button viewStyle='back' className={styles.button_back} onClick={() => {navigate("/")}}/>

                <div className={styles.header_content}>
                    <div
                        className={styles.tour_image}
                        style={{"backgroundImage": `url(${tour.image})`}}
                    ></div>

                    <div className={styles.tour_name}>{tour.name}</div>

                    <div className={styles.tour_info_click} onClick={() => setIsInfoOpened(true)}>
                        <div className={styles.info_text}>Прочитать описание</div>
                        <Button viewStyle='info_white' className={styles.button_info} onClick={() => {
                        }}/>
                    </div>

                    <Button text="Посмотреть на карте" viewStyle="main" to="/mappage" onClick={() => {
                    }} className={styles.button_look}/>
                </div>

            </div>

            <PopOverTopMenu state='preview'/>
            {
                isInfoOpened && <InfoPlacesList close={() => setIsInfoOpened(false)}/>
            }

        </div>
    )
}

const mapStateToProps = (state: State) => {
    const tourIndex = state.tours.findIndex(tour => tour.id === state.userData.selectedTourId);
    return {
        tour: state.tours[tourIndex],
        tourIndex
    }
}

export default connect(mapStateToProps)(PreviewTour);