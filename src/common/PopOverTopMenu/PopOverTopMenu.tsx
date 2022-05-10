import { connect } from 'react-redux';
import { useRef, useState } from 'react';
import { useHeightChange } from '../../core/hooks/useHeightChange';
import styles from './PopOverTopMenu.module.css';
import { PlacePanel } from '../PlacePanel/PlacePanel';
import { AppDispatch } from '../../model/store';
import { RoutePoint, State } from '../../model/types';
import type { Place } from '../../model/types';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import trashbin from './img/trashbin.svg'
import trashbin_focused from './img/trashbin_focused.svg'
import human from './img/human.svg'
import Button from '../Button/Button';


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
    const [deletedPlaces, setDeletedPlaces] = useState<Array<Place>>([])
    const popOverTopRef = useRef(null)
    const [dragging, setDragging] = useState(false)


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
    if (!style) {
        style = 'closed'
    }
    const minHeightInPx = document.documentElement.clientHeight * minHeight() / 100

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
        console.log(result)
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
                    onClick={() => {}}
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
                    {!dragging && state === 'editable' && currentStyle==='opened' && <div
                        className={styles.main_button_bottom}
                    >
                        <Button 
                            viewStyle='with_image'
                            image={human}
                            onClick={() => {}}
                            text='Начать'
                        />
                    </div>}  
                </div>    
            </DragDropContext>
        </div>
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