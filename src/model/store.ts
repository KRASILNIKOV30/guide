import { createStore } from 'redux';
import { State } from './types'
import { selectTourReducer, completeTourReducer, passRoutePointReducer } from './reducers';
import tour1 from './images/1/image.svg';
import tour2 from './images/2/image.svg';
import tour3 from './images/3/image.svg';
import tour2place1 from './images/2/1/image.svg'
import tour2place2 from './images/2/2/image.svg'
import tour2place3 from './images/2/3/image.svg'
import tour2place4 from './images/2/4/image.svg'
import tour2place5 from './images/2/5/image.svg'

let initialState: State = {
    userData: {
        selectedTourId: '2',
        routeState: [
            {
                placeId: '1',
                state: 'active'
            },
            {
                placeId: '2',
                state: 'default'
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
    },
    tours: [
        {
            id: '1',
            name: 'Йошкар-Ола за 1 день',
            image: tour1,
            description: 'Постмотрите самые важные места Йошки всего за 1 день.',
            places: [
                {
                    id: '1',
                    name: 'Место',
                    image: '',
                    description: 'Описание.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                }
            ]
        },
        {
            id: '2',
            name: 'Лучшие места для фото',
            image: tour2,
            description: 'Привет! Это подборка самых фотогеиничных мест нашего города.',
            places: [
                {
                    id: '1',
                    name: 'Дом Бабочка',
                    image: tour2place1,
                    description: 'Получаются кадры как с обложек “Molchat Doma”',
                    coordinates: {x: 56.62744065291153, y: 47.913865970552685},
                    address: 'Ленинский проспект, 16'
                },
                {
                    id: '2',
                    name: 'Дом Флакон',
                    image: tour2place2,
                    description: 'Один из флагманов йошкар-олинских фото-мест.',
                    coordinates: {x: 56.62829352962311, y: 47.90562035707867},
                    address: 'Эшкинина, 2'
                },
                {
                    id: '3',
                    name: 'iSpring',
                    image: tour2place3,
                    description: 'Ну красота какая ну ты посмотри.',
                    coordinates: {x: 56.629823857993706, y: 47.894747136134015},
                    address: 'Вознесенская, 110'
                },
                {
                    id: '4',
                    name: 'Набережная улица',
                    image: tour2place4,
                    description: 'Дух Царевокошайска спрятан где-то здесь!',
                    coordinates: {x: 56.641243, y: 47.906103},
                    address: 'Набережная, 1',
                },
                {
                    id: '5',
                    name: 'Вараксинский мост',
                    image: tour2place5,
                    description: 'Не самое романтичное место, но самый романтичый вид на Йошкар-Олу, с которого можно увидеть всю многоликость нашего города.',
                    coordinates: {x: 56.644361, y: 47.911259},
                    address: 'Водопроводная'
                }
            ]
        },
        {
            id: '3',
            name: 'Гастрономический тур',
            image: tour3,
            description: 'Вот и тур по самым вкусным заведниям Красного Города.',
            places: [
                {
                    id: '1',
                    name: 'Место',
                    image: '',
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
    id?: string
}

function mainReducer(state: State = initialState, action: ActionType): State {
    switch (action.type) {
        case 'SELECT_TOUR': 
            if (action.id !== undefined) {
                const pointIds: Array<string> = [];
                state.tours.find(tour => tour.id === action.id)?.places.forEach(place => pointIds.push(place.id));
                state.userData = selectTourReducer(state.userData, action.id, pointIds);
            }; break;
        case 'COMPLETE_TOUR': state.userData = completeTourReducer(state.userData); break;
        case 'PASS_ROUTE_POINT':  state.userData = passRoutePointReducer(state.userData);
    }
    //localStorage.setItem("savedUserData", JSON.stringify(state.userData))
    return state
}


let store = createStore(mainReducer, initialState)

export type AppDispatch = typeof store.dispatch

export { store }