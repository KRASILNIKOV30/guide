import { createStore } from 'redux';
import { RoutePoint, State } from './types'
import { selectTourReducer, completeTourReducer, passRoutePointReducer, loadRouteReducer } from './reducers';
import tour1 from './images/1/image.svg';
import tour2 from './images/2/image.svg';
import tour3 from './images/3/image.svg';
import tour2place1 from './images/2/1/image.svg'
import tour2place2 from './images/2/2/image.svg'
import tour2place3 from './images/2/3/image.svg'
import tour2place4 from './images/2/4/image.svg'
import tour2place5 from './images/2/5/image.svg'
import tour1place1 from './images/1/1/image.svg'
import tour1place2 from './images/1/2/image.svg'
import tour1place3 from './images/1/3/image.svg'
import tour1place4 from './images/1/4/image.svg'
import tour1place5 from './images/1/5/image.svg'
import tour1place6 from './images/1/6/image.svg'
import tour1place7 from './images/1/7/image.svg'
import tour1place8 from './images/1/8/image.svg'
import tour1place9 from './images/1/9/image.svg'
import { loadRoute } from './actionCreators';

let initialState: State = {
    userData: {
        selectedTourId: '2',
        routeState: [],
        completedTouresId: ['3'],
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
                    name: 'Часы с Осликом',
                    image: tour1place1,
                    description: 'Каждый час под циферблатом ходит ослик и играет музыка, “для галочки” советуем посмотреть.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '2',
                    name: 'Йошкин Кот',
                    image: tour1place2,
                    description: 'Пожалуй, талисман города! Фото с ним — один из обязательных пунтков.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '3',
                    name: 'Проспект Гагарина',
                    image: tour1place3,
                    description: 'Описание.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '4',
                    name: 'Театр Шкетана и Ленин',
                    image: tour1place4,
                    description: 'Описание.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '5',
                    name: 'Вася из Гуанчжоу',
                    image: tour1place5,
                    description: 'Одно из лучших заведений города, которое объединяет под собой рестораны восточной, грузинской, итальянской кухни, а так же пекарню.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '6',
                    name: 'Набережная',
                    image: tour1place6,
                    description: 'Воскресенская набережная, Амстердам и Брюгге — те самые сахарные домики! Относиться к ним по-разному, но прогуляться определнно стоит.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '7',
                    name: '“Башня”',
                    image: tour1place7,
                    description: 'Описание.',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '8',
                    name: 'Старая Набережная',
                    image: '',
                    description: 'Первая набережная Йошкар-Олы, здесь витает дух Царевококшайска, просто стоит внимательнее приглядется!',
                    coordinates: {x: 0, y: 0},
                    address: ''
                },
                {
                    id: '9',
                    name: 'Парк Культуры',
                    image: tour1place9,
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
    id?: string,
    routePoints?: Array<RoutePoint>
}

function mainReducer(state: State = initialState, action: ActionType): State {
    switch (action.type) {
        case 'SELECT_TOUR': 
            if (action.id !== undefined) {
                state.userData = selectTourReducer(state.userData, action.id);
            }; break;
        case 'COMPLETE_TOUR': state.userData = completeTourReducer(state.userData); break;
        case 'LOAD_ROUTE': 
        if (action.routePoints !== undefined) {
            state.userData = loadRouteReducer(state.userData, action.routePoints);
        }; break;
        case 'PASS_ROUTE_POINT':  state.userData = passRoutePointReducer(state.userData);
    }
    //localStorage.setItem("savedUserData", JSON.stringify(state.userData))
    console.log(state)
    return state
}


let store = createStore(mainReducer, initialState)

export type AppDispatch = typeof store.dispatch

export { store }