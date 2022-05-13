import { connect } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useHeightChange } from '../../core/hooks/useHeightChange';
import styles from './PopOverTopMenu.module.css';
import PlacePanel from '../PlacePanel/PlacePanel';
import type { PointInfo, RoutePoint, State } from '../../model/types';
import type { Place } from '../../model/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import trashbin from './img/trashbin.svg'
import trashbin_focused from './img/trashbin_focused.svg'
import human from './img/human.svg'
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import { AppDispatch } from '../../model/store';
import { completeTour, loadRoute, passRoutePoint } from '../../model/actionCreators';


interface PopOverTopMenuProps {
    tourName?: string,
    style?: 'closed' | 'opened',
    places: Array<Place>,
    routeState: Array<RoutePoint>,
    state: 'preview' | 'editable' | 'active',
    getRoute?: (route: Array<PointInfo>) => void,
    openInfo?: () => void,
    loadRoute: (routePoints: Array<RoutePoint>) => void,
    passRoutePoint: () => void
}

const PopOverTopMenu = ({
    tourName = '',
    style,
    places,
    routeState,
    state,
    getRoute,
    openInfo = () => {},
    loadRoute,
    passRoutePoint
}: PopOverTopMenuProps) => {
    if (!style) {
        style = 'closed'
    }

    const [currentPlaces, setCurrentPlaces] = useState(places)
    const [deletedPlaces, setDeletedPlaces] = useState<Array<Place>>([])
    const popOverTopRef = useRef(null)
    const [dragging, setDragging] = useState(false)
    const [popupState, setPopupState] = useState<'none' | 'question' | 'final'>('none');
    useEffect(() => {
        if(state === 'active' && routeState[routeState.length - 1].state === 'finished') {
            setPopupState('final')
        }
        return () => {}
    }, [routeState])
    const activePlaceNameRef = useRef<string>('места')
    const [currentStyle, setCurrentStyle] = useState(style)
    const popOverTopMenuRef = useRef(null)


    const maxHeight = () => {
        switch (state) {
            case 'preview':
                return 97.27;
            case 'editable':
                return 86.5;
            case 'active':
                return 86.5;
        };
    }    
    const avgHeight = 60;
    const minHeight = () => {
        switch (state) {
            case 'preview':
                return 37.94;
            case 'editable':
                return 22;
            case 'active':
                return 22;
        }
    };
    
    const minHeightInPx = document.documentElement.clientHeight * minHeight() / 100
    

    useEffect(() => {
        if (currentStyle === 'closed' && state === 'editable' && getRoute !== undefined) {
            const route: Array<PointInfo> = [];
            currentPlaces.forEach(place => {route.push({coordinates: [place.coordinates.x, place.coordinates.y], state: "default"})})
            getRoute(route);
        }
    
        return () => { }
    }, [currentStyle]);

    let height = '';
    switch (currentStyle) {
        case 'closed': {
            height = `${minHeight()}vh`
            break;
        }
        case 'opened': {
            height = `${maxHeight()}vh`;
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

    const getBottomButton = () => {
      
        switch (state) {
            case 'preview':
                return null;
            case 'editable':
                return (
                    <Button 
                        viewStyle='with_image'
                        image={human}
                        onClick={() => {
                            const pointsArray: Array<RoutePoint> = [];
                            currentPlaces.forEach(place => {pointsArray.push({placeId: place.id, state: "default"})});
                            loadRoute(pointsArray);
                            if (getRoute) {
                                const route: Array<PointInfo> = [];
                                currentPlaces.forEach(place => {route.push({coordinates: [place.coordinates.x, place.coordinates.y], state: "default"})})
                                getRoute(route);
                            }
                        }}
                        text='Начать'
                    />
                );
            case 'active':
                let activePlaceIndex = routeState.findIndex(place => place.state === 'active')
                if (activePlaceIndex === -1) {
                    activePlaceIndex = routeState.length - 1
                }
                const indexPlaceInData = places.findIndex(place => place.id === routeState[activePlaceIndex].placeId)
                activePlaceNameRef.current = places[indexPlaceInData].name
                const activePlaceCoordinatesX = places[indexPlaceInData].coordinates.x;
                const activePlaceCoordinatesY = places[indexPlaceInData].coordinates.y; 
                let currentCoordinatesX: number;
                let currentCoordinatesY: number;
                navigator.geolocation.getCurrentPosition(
                    (crd) => {
                        currentCoordinatesX = crd.coords.latitude; 
                        currentCoordinatesY = crd.coords.longitude
                    }, 
                    (err) => {
                    }, 
                    {
                        enableHighAccuracy: true, 
                        timeout: 5000, maximumAge: 0
                    }
                )
                
                return (
                    <Button
                        viewStyle='with_image'
                        onClick={() => {
                            window.open(`https://yandex.ru/maps/?rtext=${currentCoordinatesX},${currentCoordinatesY}~${activePlaceCoordinatesX},${activePlaceCoordinatesY}&rtt=pd`)
                            setPopupState('question')
                        }}
                        text={`Маршрут до точки ${activePlaceIndex + 1}`}
                    />
                )
        }
    }

    const getPlaceState = (place: Place) => {
        switch (state) {
            case 'preview':
                return "tourPreview";
            case 'editable':
                return "default";
            case 'active': {
                return routeState.find(placeState => placeState.placeId === place.id)!.state
            }
        } 
    }

    const placeList = currentPlaces.map((place, index) => 
        <li key={place.id} className = {styles.place}>
            <Draggable
                key={place.id} 
                draggableId={place.id} 
                index={index}
                isDragDisabled={state !== 'editable' || currentStyle === 'closed' || currentPlaces.length === 1}
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

    const deletedPlaceList = deletedPlaces.map((place, index) => 
        <li key={place.id} className = {styles.place}>
            <Draggable
                key={place.id} 
                draggableId={place.id} 
                index={index}
                isDragDisabled={state !== 'editable' || currentStyle === 'closed'}
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
                            state='deleted'
                            number={index + 1}
                        />     
                    </div>
                )}
            </Draggable>
        </li> 
    )

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        const destination = result.destination.droppableId;
        const source = result.source.droppableId;
        const array = Array.from(currentPlaces);
        const deletedArray = Array.from(deletedPlaces);

        if (source === 'droppableActive') {
            if (destination === 'droppableActive') {
                const [removed] = array.splice(result.source.index, 1)
                array.splice(result.destination.index, 0, removed)    
            } else if (destination === 'droppableDeleted') {
                const [removed] = array.splice(result.source.index, 1)
                deletedArray.push(removed)    
            }
        } else if (source === 'droppableDeletedPlaces') {
            if (destination === 'droppableActive') {
                const [removed] = deletedArray.splice(result.source.index, 1)
                array.push(removed)
            } else if (destination === 'droppableDeletedPlaces') {
                const [removed] = deletedArray.splice(result.source.index, 1)
                deletedArray.splice(result.destination.index, 0, removed)
            }
        }
        
        setCurrentPlaces(array)
        setDeletedPlaces(deletedArray)
        setDragging(false)
    }

    const getTrashBinImage = (isDraggingOver: boolean) => {
        if (!dragging) {
            return ''
        }
        return isDraggingOver ? trashbin_focused : trashbin
    }

    const onDragStart = (result: any) => {
        console.log(result)
        setDragging(result.source.droppableId === 'droppableActive')
    } 

    return(
        <div>
            {state === 'editable' && <div 
                className={styles.main_button_top}
                style={{'transform': `translateY(${-minHeightInPx-13}px)`}}
            >
                <Button
                    viewStyle='with_image'
                    image={human}
                    text='Начать'
                    onClick={() => {
                        const pointsArray: Array<RoutePoint> = [];
                        currentPlaces.forEach(place => {pointsArray.push({placeId: place.id, state: "default"})});
                        loadRoute(pointsArray);
                    }}
                />
            </div>}
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <div
                    ref = {popOverTopMenuRef}
                    className = {styles.pop_over_menu}
                    style = {{
                        'height': `${height}`
                    }}
                >   
                    <div>
                        {state !== 'preview' && <div
                            className={styles.info_button}
                        >
                            <Button viewStyle='info' onClick={openInfo}></Button>
                        </div>}
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
                                <div
                                    className={styles.delete_button}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{'background': `url(${getTrashBinImage(snapshot.isDraggingOver)}) no-repeat center center`}}
                                >
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        
                        {deletedPlaceList.length !== 0 && <h2 className={styles.deleted_place_list_header}>Убрано из тура</h2>}
                        <Droppable droppableId='droppableDeletedPlaces' isDropDisabled={true}>
                            {(provided, snapshot) => (
                                <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={styles.deleted_place_list}
                                >
                                    {deletedPlaceList}
                                    {provided.placeholder}
                                </ul>
                            )}        
                        </Droppable>
                    </div>  
                    {(!dragging && currentStyle==='opened') && <div
                        className={styles.main_button_bottom}
                    >
                        {getBottomButton()}   
                    </div>}  
                </div>    
            </DragDropContext>
            {popupState !== 'none' && <Popup
                state={popupState} 
                name={popupState === 'question' ? activePlaceNameRef.current : tourName}
                onClick={setPopupState} 
                onPositiveClick={passRoutePoint}
            />}
        </div>
    )
}



const mapStateToProps = (state: State) => {
    const currentTourIndex = state.tours.findIndex(tour => tour.id === state.userData.selectedTourId)
    const placesInfo = state.tours[currentTourIndex].places;
    const routeStateInfo = state.userData.routeState;
    return {
        places: placesInfo,
        routeState: routeStateInfo
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        loadRoute: (routePoints: Array<RoutePoint>) => dispatch(loadRoute(routePoints)),
        passRoutePoint: () => dispatch(passRoutePoint())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopOverTopMenu);