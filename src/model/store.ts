import { createStore } from 'redux';
import { State, userData } from './types'
import { selectTourReducer, startStopRouteReducer, completeTourReducer, passRoutePointReducer } from './reducers';
import { deepClone } from '../core/functions/deepClone';

let initialState: State = {
    userData: {
        selectedTourId: undefined,
        routeState: [],
        completedTouresId: [],
        started: false
    },
    tours: [
        {
            id: '1',
            name: 'Йошкар-Ола за 1 день',
            img: undefined,
            description: 'В этом туре вы можете пройти по интереснейшим местам Йошка-Олы всего за один день',
            places: [
                {
                    id: '1',
                    name: 'Дом Макса',
                    img: undefined,
                    description: 'Боооольшой',
                    coordinates: {x: 13, y: 23}
                },
                {
                    id: '2',
                    name: 'Дом Богдана',
                    img: undefined,
                    description: 'Не видел, но там есть ноутбук для проги',
                    coordinates: {x: 68, y: 32}
                },
                {
                    id: '3',
                    name: 'Дом Тахира',
                    img: undefined,
                    description: 'ТАМ КОШКИ 2 КОТ И КОШКА',
                    coordinates: {x: 42, y: 6}
                },
                {
                    id: '4',
                    name: 'Дом Кати',
                    img: undefined,
                    description: 'офигенский, 100 проц',
                    coordinates: {x: 1, y: -99}
                }
            ]
        },
        {
            id: '2',
            name: 'Лучшие места для фото',
            img: undefined,
            description: 'Зачекинтесь на этих кульных спотах для своего инстика и получите много классов!',
            places: [
                {
                    id: '1',
                    name: 'Зеркало',
                    img: undefined,
                    description: 'Вы прекрасны, вам не нужен красивый фон чтобы показать это всему миру.',
                    coordinates: {x: 0, y: 0}
                }
            ]
        }
    ]
};

export type ActionType = {
    type: string,
    id?: string,
    started?: boolean,
    number?: number,
    /*x?: number,
    y?: number*/
}

function mainReducer(state: State = initialState, action: ActionType): State {
    switch (action.type) {
        case 'SELECT_TOUR': 
            if (action.id !== undefined) {
                const pointIds: Array<string> = [];
                state.tours.find(tour => tour.id === action.id)?.places.forEach(place => pointIds.push(place.id));
                state.userData = selectTourReducer(state.userData, action.id, pointIds);
            }; break;
        case 'START_STOP_ROUTE': if (action.started !== undefined) {
            state.userData = startStopRouteReducer(state.userData, action.started)
        } break;
        case 'COMPLETE_TOUR': state.userData = completeTourReducer(state.userData); break;
        case 'PASS_ROUTE_POINT': if (action.number !== undefined) {
            state.userData = passRoutePointReducer(state.userData, action.number)
        }; /*break;
        case 'CHANGE_CURRENT_POSITION': if(action.x !== undefined && action.y !== undefined) {
            state.userData = changeCurrentPositionReducer(state.userData, {x: action.x, y: action.y})
        }*/
    }
    localStorage.setItem("savedUserData", JSON.stringify(state.userData))
    return state
}


let store = createStore(mainReducer, 
    localStorage.getItem("savedUserData") !== null ? { ...initialState, userData: deepClone(JSON.parse(localStorage.getItem("savedUserData")!)) as userData}
    : initialState)

export { store }