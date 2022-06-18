import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import PopOverTopMenu from '../../common/PopOverTopMenu/PopOverTopMenu';
import YandexMap from '../../common/YandexMap/YandexMap';
import Popup from '../../common/Popup/Popup';
import styles from './Map.module.css';

import { PointInfo, State } from '../../model/types';
import { useState } from 'react';

import InfoPlacesList from '../../common/InfoPlacesList/InfoPlacesList';
import { AppDispatch } from '../../model/store';
import { selectTour } from '../../model/actionCreators';

interface MapProps {
    isTourStarted: boolean,
    selectedTourId: string,
    tourName?: string,
    selectTour: (id: string) => void
}

const Map = ({ isTourStarted, selectedTourId, tourName, selectTour }: MapProps) => {
    const [length, setLength] = useState<number>();
    const [time, setTime] = useState<number>();
    const [isInfoOpened, setIsInfoOpened] = useState(false);
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    const [route, setRoute] = useState<Array<PointInfo>>([]);

    const navigate = useNavigate();

    return (
        <div className={styles.preview_map}>
            <div className={`${styles.top_menu} ${isTourStarted && styles.top_menu_started}`}>
                {
                    isTourStarted? <div className={styles.tour_name}>{tourName}</div>: 
                    <>
                        <div className={styles.header_metric}>Весь маршрут (примерно)</div>
                        <div className={styles.metric}>{time !== undefined? time: "-"}, {length !== undefined? length: "-"}</div>
                    </>
                }
                <Button viewStyle='cancel' onClick={() => setIsPopupOpened(true)} className={styles.button_close} />
            </div>
            <div className={styles.map_container}>
                <YandexMap routeState={route} getMetrics={(length, time) => {setLength(length); setTime(time)}} />
            </div>

            {
                isTourStarted
                    ? <PopOverTopMenu 
                        state='active'
                        openInfo={() => setIsInfoOpened(true)}
                    />
                    : <PopOverTopMenu 
                        state='editable' 
                        getRoute={(newRoute) => {setRoute(newRoute); console.log(newRoute)}} 
                        openInfo={() => setIsInfoOpened(true)}
                    />
            }
            

            {
                isInfoOpened && <InfoPlacesList close={() => setIsInfoOpened(false)}/>
            }

            {isPopupOpened && <Popup
                state='quit'
                name=''
                onClick={() => setIsPopupOpened(false)}  
                onNegativeClick={() => {
                    selectTour(selectedTourId);
                    navigate('/previewtour');
                }}
            />}
        </div>
    )
}

const mapStateToProps = (state: State) => {
    return {
        tourName: state.tours.find(tour => tour.id === state.userData.selectedTourId)?.name,
        selectedTourId: state.userData.selectedTourId,
        isTourStarted: state.userData.routeState.length > 0
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        selectTour: (id: string) => dispatch(selectTour(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)