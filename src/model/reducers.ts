import { deepClone } from '../core/functions/deepClone';
import { userData, RoutePoint } from './types'

function selectTourReducer(userData: userData, tourId: string): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.selectedTourId = tourId;
    newUserData.routeState = [];
    return newUserData
}

function completeTourReducer(userData: userData): userData {
    const newUserData = deepClone(userData) as userData;
    if(!newUserData.completedTouresId.includes(newUserData.selectedTourId)) {
        newUserData.completedTouresId.push(newUserData.selectedTourId)
    }
    newUserData.selectedTourId = '';
    newUserData.routeState = [];
    return newUserData
}

function loadRouteReducer(userData: userData, routePoints: Array<RoutePoint>): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.routeState = routePoints;
    newUserData.routeState[0].state = 'active';
    console.log('newUserData ', newUserData.routeState)
    return newUserData
}

function passRoutePointReducer(userData: userData): userData {
    const newUserData = deepClone(userData) as userData;
    const indexActive = newUserData.routeState.findIndex(point => point.state === 'active');
    if (indexActive !== -1) {
        newUserData.routeState[indexActive].state = 'finished';
        if (indexActive !== newUserData.routeState.length - 1) {
            newUserData.routeState[indexActive + 1].state = 'active';
        }
    }
    return newUserData;
}

export { selectTourReducer, completeTourReducer, passRoutePointReducer, loadRouteReducer }