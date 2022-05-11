import { deepClone } from '../core/functions/deepClone';
import { userData, RoutePoint } from './types'

function selectTourReducer(userData: userData, tourId: string, pointIds: Array<string>): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.selectedTourId = tourId;
    const newRouteState: Array<RoutePoint> = [];
    pointIds.forEach(id => newRouteState.push({placeId: id, state: 'default'}))
    newUserData.routeState = newRouteState;
    return newUserData
}

function completeTourReducer(userData: userData): userData {
    const newUserData = deepClone(userData) as userData;
    if(newUserData.selectedTourId !== undefined && !newUserData.completedTouresId.includes(newUserData.selectedTourId)) {
        newUserData.completedTouresId.push(newUserData.selectedTourId)
    }
    newUserData.selectedTourId = '';
    newUserData.routeState = [];
    return newUserData
}

function passRoutePointReducer(userData: userData): userData {
    const newUserData = deepClone(userData) as userData;
    const indexActive = newUserData.routeState.findIndex(point => point.state === 'active');
    newUserData.routeState[indexActive].state = 'finished';
    if (indexActive !== newUserData.routeState.length - 1) {
        newUserData.routeState[indexActive + 1].state = 'active';
    }
    return newUserData;
}

export { selectTourReducer, completeTourReducer, passRoutePointReducer }