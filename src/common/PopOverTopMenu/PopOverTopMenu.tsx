import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import styles from './PopOverTopMenu.module.css';
import { PlacePanel } from '../PlacePanel/PlacePanel';
import { AppDispatch } from '../../model/store';
import { RoutePoint, State } from '../../model/types';
import type { Place } from '../../model/types'

interface PopOverTopMenuProps {
    state?: 'closed' | 'halfOpened' | 'fullyOpened',
    places: Array<Place>,
    routeState: Array<RoutePoint>
}

const PopOverTopMenu = ({
    state,
    places,
    routeState
}: PopOverTopMenuProps) => {
    const maxHeight = 100;
    const maxAvgHeight = 80;
    const avgHeight = 50;
    const minAvgHeight = 40;
    const minHeight = 20;
    if (!state) {
        state = 'closed'
    }

    const [currentState, setCurrentState] = useState(state)
    const popOverTopRef = useRef(null)
    const popOverTopMenuRef = useRef(null)

    let height = '';
    switch (currentState) {
        case 'closed': {
            height = `${minHeight}vh`
            break;
        }
        case 'halfOpened': {
            height = `${avgHeight}vh`
            break
        }
        case 'fullyOpened': {
            height = `${maxHeight}vh`
        }
    }

    useDragAndDrop({
        elementRef: popOverTopMenuRef,
        activeElementRef: popOverTopRef,
        setState: setCurrentState,
        maxHeight,
        maxAvgHeight,
        minAvgHeight,
        minHeight
    })

    const placeList = places.map((place, index) => 
        <li key={place.id} className = {styles.place}>
            <PlacePanel
                name = {place.name}
                address={place.address}
                imageSrc={place.image}
                state={routeState.find(placeState => placeState.placeId === place.id)!.state}
                number={index + 1}
            />
        </li> 
    )

    return(
        <div
            ref = {popOverTopMenuRef}
            className = {styles.pop_over_menu}
            style = {{
                'height': `${height}`
            }}
        >
            <div
                className = {styles.pop_over_top}
                ref = {popOverTopRef}
            >
            </div>
            <ul className={styles.place_list}>{placeList}</ul>
        </div>
    )
}

const mapStateToProps = (state: State) => {
    const currentTourIndex = state.tours.findIndex(tour => tour.id === state.userData.selectedTourId)
    const placesInfo = state.tours[currentTourIndex].places;
    const routeStateInfo = state.userData.routeState
    return {
        places: placesInfo,
        routeState: routeStateInfo
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopOverTopMenu);