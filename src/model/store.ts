import { createStore } from 'redux';
import { State } from './types'
import { selectTourReducer, startStopRouteReducer, completeTourReducer, passRoutePointReducer } from './reducers';

let initialState: State = {
    userData: {
        selectedTourId: '1',
        routeState: [{placeId: '1', passed: false}, {placeId: '2', passed: false}, {placeId: '3', passed: false}],
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
                    coordinates: {x: 56.631929, y: 47.882962}
                },
                {
                    id: '2',
                    name: 'Дом Богдана',
                    img: undefined,
                    description: 'Не видел, но там есть ноутбук для проги',
                    coordinates: {x: 56.634416, y: 47.899685}
                },
                {
                    id: '3',
                    name: 'Дом Тахира',
                    img: undefined,
                    description: 'ТАМ КОШКИ 2 КОТ И КОШКА',
                    coordinates: {x: 56.633800, y: 47.930336}
                },
                {
                    id: '4',
                    name: 'Дом Кати',
                    img: undefined,
                    description: 'офигенский, 100 проц',
                    coordinates: {x: 56.645720, y: 47.980040}
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
        };
    }
    localStorage.setItem("savedUserData", JSON.stringify(state.userData))
    return state
}


let store = createStore(mainReducer, initialState)

export { store }