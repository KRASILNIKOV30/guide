import { createStore } from 'redux';
import { RoutePoint, State } from './types'
import { selectTourReducer, completeTourReducer, passRoutePointReducer, loadRouteReducer } from './reducers';
import tour1 from './images/1/image.jpg';
import tour2 from './images/2/image.jpg';
import tour3 from './images/3/image.jpg';
import tour2place1 from './images/2/1/image.jpg'
import tour2place2 from './images/2/2/image.jpg'
import tour2place3 from './images/2/3/image.jpg'
import tour2place4 from './images/2/4/image.jpg'
import tour2place5 from './images/2/5/image.jpg'
import tour1place1 from './images/1/1/image.jpg'
import tour1place2 from './images/1/2/image.jpg'
import tour1place3 from './images/1/3/image.jpg'
import tour1place4 from './images/1/4/image.jpg'
import tour1place5 from './images/1/5/image.jpg'
import tour1place6 from './images/1/6/image.jpg'
import tour1place7 from './images/1/7/image.jpg'
import tour1place8 from './images/1/8/image.jpg'

import tour3place1 from './images/3/1/image.jpg'
import tour3place2 from './images/3/2/image.jpg'
import tour3place3 from './images/3/3/image.jpg'
import tour3place4 from './images/3/4/image.jpg'
import tour3place5 from './images/3/5/image.jpg'

import tour3place6 from './images/3/6/image.jpg'



import { loadRoute } from './actionCreators';
import { deepClone } from '../core/functions/deepClone';

let initialState: State = {
    userData: {
        selectedTourId: '2',
        routeState: [],
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
                    name: 'Часы с Осликом',
                    image: tour1place1,
                    description: 'Каждый час под циферблатом ходит ослик и играет музыка, “для галочки” советуем посмотреть.',
                    coordinates: {x: 56.63181981, y: 47.88693666},
                    address: 'площадь Воеводы И.А. Оболенского-Ноготкова'
                },
                {
                    id: '2',
                    name: 'Йошкин Кот',
                    image: tour1place2,
                    description: 'Пожалуй, талисман города! Фото с ним — один из обязательных пунтков.',
                    coordinates: {x: 56.63121298, y: 47.88863003},
                    address: 'Йошкин кот'
                },
                {
                    id: '3',
                    name: 'Проспект Гагарина',
                    image: tour1place3,
                    description: 'Уютный парк отдыха с искусной мозаикой и красивыми памятниками',
                    coordinates: {x: 56.6245628, y: 47.88500369},
                    address: 'Проспект Гагарина'
                },
                {
                    id: '4',
                    name: 'Театр Шкетана и Ленин',
                    image: tour1place4,
                    description: 'Хоть такой театр есть во многих городах, то Ленин — уникальный и был сделан по спецзаказу.',
                    coordinates: {x: 56.63168114, y: 47.89149284},
                    address: 'площадь имени В.И. Ленина, 2'
                },
                {
                    id: '5',
                    name: 'Вася из Гуанчжоу',
                    image: tour1place5,
                    description: 'Одно из лучших заведений города, которое объединяет под собой рестораны восточной, грузинской, итальянской кухни, а так же пекарню.',
                    coordinates: {x: 56.63404641, y: 47.89992034},
                    address: 'бульвар Чавайна, 31к1'
                },
                {
                    id: '6',
                    name: 'Набережная',
                    image: tour1place6,
                    description: 'Воскресенская набережная, Амстердам и Брюгге — те самые сахарные домики! Относиться к ним по-разному, но прогуляться определнно стоит.',
                    coordinates: {x: 56.63014978, y: 47.90436923},
                    address: 'набережная Брюгге'
                },
                {
                    id: '7',
                    name: '“Башня”',
                    image: tour1place7,
                    description: 'Вы сможете проникнуться идеями молодых дизайнеров, художников, фотографов, режиссеров, а также посмотреть на звезды из телескопа!',
                    coordinates: {x: 56.63376907, y: 47.90287256},
                    address: 'площадь Республики Пресвятой Девы Марии'
                }/* ,
                {
                    id: '8',
                    name: 'Парк Культуры',
                    image: tour1place8,
                    description: 'Описание.',
                    coordinates: {x: 56.63590115, y: 47.89273918},
                    address: 'Комсомольская улица, 124'
                } */
            ]
        },
        {
            id: '2',
            name: 'Не попса по-марийски',
            image: tour2,
            description: 'Подборка мест, по которым не проведут на автобусной экскурсии!',
            places: [
                {
                    id: '1',
                    name: 'Дом Флакон',
                    image: tour2place1,
                    description: 'У него много имен: Флакон, Кока-Кола, Одеколон, но суть одна — одно из самых культовых задний города',
                    coordinates: {x: 56.62829352962311, y: 47.90562035707867},
                    address: 'Эшкинина, 2'
                },
                {
                    id: '2',
                    name: 'Старая Набережная',
                    image: tour2place2,
                    description: 'Первая набережная Йошкар-Олы, здесь витает дух Царевококшайска, просто стоит внимательнее приглядется!',
                    coordinates: {x: 56.64132224, y: 47.90623426},
                    address: 'Набережная улица'
                },
                {
                    id: '3',
                    name: 'Ступеньки у “спара”',
                    image: tour2place3,
                    description: 'Отсюда открывается вид на всю набережную, ночью здесь особенно красиво.',
                    coordinates: {x: 56.636744, y: 47.907118},
                    address: 'Вознесенская, 110'
                },
                {
                    id: '4',
                    name: 'Балконы Бабочки',
                    image: tour2place4,
                    description: 'Способ увидеть весь город для самых экстремальных туристов. Вход в дом находится между её “крыльев”, с обратной стороны дома. Главное не заблудитесь внутри!',
                    coordinates: {x: 56.62744065291153, y: 47.913865970552685},
                    address: 'Ленинский проспект, 16'
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
            name: 'Тур для всех!',
            image: tour3,
            description: 'Мы все хорошо поработали — самое время хорошо отдохнуть!',
            places: [
                {
                    id: '1',
                    name: 'Маленькое Чикаго',
                    image: tour3place1,
                    description: 'Возможно, не самое модное место, зато душевное и семейное. А если сесть летом на верадне, то и вполне роскошное!',
                    coordinates: {x: 56.630917, y: 47.894847},
                    address: 'Советская улица, 151'
                },
                {
                    id: '2',
                    name: 'Качели у iSpring',
                    image: tour3place2,
                    description: 'Ну вот точно место номер один чтобы отдохнуть.',
                    coordinates: {x: 56.629824, y: 47.894760},
                    address: 'Вознесенская улица, 110'
                },
                {
                    id: '3',
                    name: 'Чайный квадрат',
                    image: tour3place3,
                    description: 'Если вы до сих пор не приобщились к чайной культуре, то самое время приобщиться! Любимое место половины команды TUMS🍵',
                    coordinates: {x: 56.626752, y: 47.920055},
                    address: 'Ленинский проспект, 12'
                },
                {
                    id: '4',
                    name: 'Сграффито Рыба',
                    image: tour3place4,
                    description: 'Работа художника Романова Кирилла Игоревича, в городе спрятано еще около семи его работ, сможете найти все?',
                    coordinates: {x: 56.637164, y: 47.904872},
                    address: 'Воскресенский мост'
                },
                {
                    id: '5',
                    name: 'Шаурма Бистро',
                    image: tour3place5,
                    description: 'Внешность обманчива.',
                    coordinates: {x: 56.629991, y: 47.891543},
                    address: 'улица Волкова, 147'
                },
                {
                    id: '6',
                    name: 'Библиотека имени Чавайна',
                    image: tour3place6,
                    description: 'Тут можно не только почитать, но и посмотреть постеры времен СССР и вдохновиться ими.',
                    coordinates: {x: 56.634189, y:  47.889908},
                    address: 'улица Пушкина, 28'
                },
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
    const newState = deepClone(state) as State;
    switch (action.type) {
        case 'SELECT_TOUR': 
            if (action.id !== undefined) {
                newState.userData = selectTourReducer(newState.userData, action.id);
            }; break;
        case 'COMPLETE_TOUR': newState.userData = completeTourReducer(newState.userData); break;
        case 'LOAD_ROUTE': 
        if (action.routePoints !== undefined) {
            newState.userData = loadRouteReducer(newState.userData, action.routePoints);
        }; break;
        case 'PASS_ROUTE_POINT':  newState.userData = passRoutePointReducer(newState.userData);
    }
    //localStorage.setItem("savedUserData", JSON.stringify(state.userData))
    return newState
}


let store = createStore(mainReducer, initialState)

export type AppDispatch = typeof store.dispatch

export { store }