import { createStore } from 'redux';
import { State } from './types'
import { selectTourReducer, startStopRouteReducer, completeTourReducer, passRoutePointReducer } from './reducers';
import tour1 from './images/1/image.svg';
import tour2 from './images/2/image.svg';
import tour3 from './images/3/image.svg';
import butterfly from './images/places/butterfly.svg'
import flacon from './images/places/flacon.svg'
import ispring from './images/places/ispring.svg'
import old_wharf from './images/places/old_wharf.svg'
import varaksin_bridge from './images/places/varaksin_bridge.svg'

let initialState: State = {
    userData: {
        selectedTourId: '2',
        routeState: [
            {
                placeId: '1',
                state: 'finished'
            },
            {
                placeId: '2',
                state: 'active'
            },
            {
                placeId: '3',
                state: 'default'
            },
            {
                placeId: '4',
                state: 'default'
            },
            {
                placeId: '5',
                state: 'default'
            },
        ],
        completedTouresId: [],
        started: false
    },
    tours: [
        {
            id: '1',
            name: 'Йошкар-Ола за 1 день',
            img: tour1,
            description: 'Постмотрите самые важные места Йошки всего за 1 день.',
            places: [
                {
                    id: '1',
                    name: 'Место',
                    img: '',
                    description: 'Описание.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                }
            ]
        },
        {
            id: '2',
            name: 'Лучшие места для фото',
            img: tour2,
            description: 'Привет! Это подборка самых фотогеиничных мест нашего города.',
            places: [
                {
                    id: '1',
                    name: 'Дом Бабочка',
                    img: butterfly,
                    description: 'Получаются кадры как с обложек “Molchat Doma”',
                    coordinates: {x: 56.631929, y: 47.882962},
                    address: 'Ленинский проспект, 16'
                },
                {
                    id: '2',
                    name: 'Дом Флакон',
                    img: flacon,
                    description: 'Один из флагманов йошкар-олинских фото-мест.',
                    coordinates: {x: 56.634416, y: 47.899685},
                    address: 'Эшкинина, 2'
                },
                {
                    id: '3',
                    name: 'iSpring',
                    img: ispring,
                    description: 'Ну красота какая ну ты посмотри.',
                    coordinates: {x: 56.633800, y: 47.930336},
                    address: 'Вознесенская, 110'
                },
                {
                    id: '4',
                    name: 'Набережная улица',
                    img: old_wharf,
                    description: 'Дух Царевокошайска спрятан где-то здесь!',
                    coordinates: {x: 56.645720, y: 47.980040},
                    address: 'Набережная, 1',
                },
                {
                    id: '5',
                    name: 'Вараксинский мост',
                    img: varaksin_bridge,
                    description: 'Не самое романтичное место, но самый романтичый вид на Йошкар-Олу, с которого можно увидеть всю многоликость нашего города.',
                    coordinates: {x: 56.645720, y: 47.980040},
                    address: 'Водопроводная'
                }
            ]
        },
        {
            id: '3',
            name: 'Гастрономический тур',
            img: tour3,
            description: 'Вот и тур по самым вкусным заведниям Красного Города.',
            places: [
                {
                    id: '1',
                    name: 'Место',
                    img: '',
                    description: 'Описание.',
                    coordinates: {x: 0, y: 0},
                    address: ''
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
    //localStorage.setItem("savedUserData", JSON.stringify(state.userData))
    return state
}


let store = createStore(mainReducer, initialState)

export type AppDispatch = typeof store.dispatch

export { store }