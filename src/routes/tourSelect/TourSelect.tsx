import styles from './TourSelect.module.css';
import { connect } from "react-redux"
import Button from '../../common/Button/Button';
import { AppDispatch } from '../../model/store';
import { selectTour } from '../../model/actionCreators';
import { State } from '../../model/types';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { config } from 'process';

type TourInfo = {
    id: string;
    name: string;
    description: string;
    image: string;
    finished: boolean;
}

interface ToolBarProps {
    tours: Array<TourInfo>;
    selectTour: (id: string) => void
}




const TourSelect = ({ tours, selectTour }: ToolBarProps) => {
    const navigate = useNavigate();

    const [focusedTourIndex, setFocusedTourIndex] = useState(0);

    const documentWidthRef = useRef(document.documentElement.clientWidth)

    const silderRef = useRef<HTMLDivElement>(null);

    const swipedLeft = () => {
        if (tours.length > focusedTourIndex + 1 && silderRef.current) {
            setFocusedTourIndex(focusedTourIndex + 1);
        }
    }

    const swipedRight = () => {
        if (focusedTourIndex > 0 && silderRef.current) {
            setFocusedTourIndex(focusedTourIndex - 1);
        }
    }

    const handlers = useSwipeable({
        onSwipedRight: (eventData) => swipedRight(),
        onSwipedLeft: (eventData) => swipedLeft(),
        swipeDuration: 400,
        delta: {
            left: 40,
            right: 40,
        },
        ...config,
    });

    return (
        <div className={styles.tour_select}>
            <div className={styles.header_container}>
                <div className={styles.header_top}>
                    <h1 className={styles.header_text}> Туры от Гида </h1>
                </div>
                <div className={styles.header_bot}>
                    <div className={styles.placemark_image}></div>
                    <div className={styles.town_name}> Йошкар-Ола </div>
                </div>
            </div>

            <div className={styles.tour_info_container}>
                <h2 className={styles.tour_name}>{tours[focusedTourIndex].name}</h2>
                <h3 className={styles.tour_info}>{tours[focusedTourIndex].description}</h3>
            </div>

            <div {...handlers}>
                <div
                    className={styles.tour_images_container}
                    ref={silderRef}
                    style={{
                        "width": `${documentWidthRef.current * tours.length}px`,
                        "transform": `translate(${focusedTourIndex * -78}vw, 0)`,
                    }}
                >
                    {
                        tours.map((tour) =>
                            <div
                                className={`${styles.tour_image} ${(tours.findIndex(tourI => tourI.id === tour.id) === focusedTourIndex) && styles.tour_image_active}`}
                                style={{ "backgroundImage": `url(${tour.image})` }}
                                key={tour.id}
                                onClick={() => {
                                    if (tour.id === tours[focusedTourIndex].id) {
                                        selectTour(tours[focusedTourIndex].id);
                                        navigate('/previewtour')
                                    }
                                }}
                            >
                                <Button text={tour.finished ? "Айда ещё!" : "Вперёд!"} viewStyle="main" to="/previewtour" onClick={() => {
                                    selectTour(tours[focusedTourIndex].id);
                                }} />
                                {
                                    tour.finished && <div className={styles.finished_mark}>Пройдено</div>
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            

            <div className={styles.slider_container}>
                {
                    tours.map((tour) =>
                        <div
                            className={`${styles.tour_point} ${(tours.findIndex(tourI => tourI.id === tour.id) === focusedTourIndex) && styles.tour_point_active}`}
                            key={tour.id}
                        > </div>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state: State) => {
    const tourInfo: Array<TourInfo> = [];
    state.tours.forEach(tour => tourInfo.push({
        id: tour.id,
        name: tour.name,
        description: tour.description,
        image: tour.image,
        finished: state.userData.completedTouresId.includes(tour.id)
    }))

    return {
        tours: tourInfo
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        selectTour: (id: string) => dispatch(selectTour(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TourSelect)