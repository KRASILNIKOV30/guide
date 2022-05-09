import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import { useHeightChange } from '../../core/hooks/useHeightChange';
import styles from './PopOverTopMenu.module.css';
import { PlacePanel } from '../PlacePanel/PlacePanel';
import { AppDispatch } from '../../model/store';
import { RoutePoint, State } from '../../model/types';
import type { Place } from '../../model/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface PopOverTopMenuProps {
    style?: 'closed' | 'opened',
    places: Array<Place>,
    routeState: Array<RoutePoint>,
    state: 'preview' | 'editable' | 'active' 
}

const PopOverTopMenu = ({
    style,
    places,
    routeState,
    state
}: PopOverTopMenuProps) => {
    const [currentPlaces, setCurrentPlaces] = useState(places)
    const popOverTopRef = useRef(null)


    const maxHeight = () => {
        switch (state) {
            case 'preview':
                return 91.2;
            case 'editable':
                return 83.4;
            case 'active':
                return 93.6;
        };
    }    
    const avgHeight = 60;
    const minHeight = () => {
        switch (state) {
            case 'preview':
                return 45;
            case 'editable':
                return 32.6;
            case 'active':
                return 32.8;
        }
    };
    if (!style) {
        style = 'closed'
    }

    const [currentStyle, setCurrentStyle] = useState(style)
    const popOverTopMenuRef = useRef(null)

    let height = '';
    switch (currentStyle) {
        case 'closed': {
            height = `${minHeight()}vh`
            break;
        }
        case 'opened': {
            height = `${maxHeight()}vh`
        }
    }

    useHeightChange({
        elementRef: popOverTopMenuRef,
        activeElementRef: popOverTopRef,
        setState: setCurrentStyle,
        avgHeight,
        maxHeight: maxHeight(),
        minHeight: minHeight()
    })

    const getPlaceState = (place: Place) => {
        switch (state) {
            case 'preview':
                return "tourPreview";
            case 'editable':
                return "default";
            case 'active':
                return routeState.find(placeState => placeState.placeId === place.id)!.state
        } 
    }

    const placeList = currentPlaces.map((place, index) => 
        <li key={place.id} className = {styles.place}>
            <Draggable
                key={place.id} 
                draggableId={place.id} 
                index={index}
                isDragDisabled={state !== 'editable'}
                disableInteractiveElementBlocking
            >
                {(provided, snapshot) => (
                    <div
                        className={styles.draggable_element}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >                        
                        <PlacePanel
                            name = {place.name}
                            address={place.address}
                            imageSrc={place.image}
                            state={getPlaceState(place)}
                            number={index + 1}
                        />     
                    </div>
                )}
            </Draggable>
        </li> 
    )

    const onDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const array = Array.from(currentPlaces);
        const [removed] = array.splice(result.source.index, 1)
        array.splice(result.destination.index, 0, removed)
        setCurrentPlaces(array)
    }

    return(
        <DragDropContext onDragEnd={onDragEnd}>
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
                    
                        <Droppable droppableId='droppableActive' >
                            {(provided, snapshot) => (
                                <ul 
                                    className={styles.place_list}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {placeList}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                        <Droppable droppableId='droppableDeleted'>
                            {(provided, snapshot) => (
                                <ul
                                    className={styles.deleted_place_list}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                </div>
        </DragDropContext>
    )
}

const mapStateToProps = (style: State) => {
    const currentTourIndex = style.tours.findIndex(tour => tour.id === style.userData.selectedTourId)
    const placesInfo = style.tours[currentTourIndex].places;
    const routeStateInfo = style.userData.routeState

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