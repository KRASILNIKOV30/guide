import { deepClone } from '../core/functions/deepClone';
import { userData, RoutePoint } from './types'

function selectTourReducer(userData: userData, tourId: string, pointIds: Array<string>): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.selectedTourId = tourId;
    const newRouteState: Array<RoutePoint> = [];
    pointIds.forEach(id => newRouteState.push({placeId: id, passed: false}))
    newUserData.routeState = newRouteState;
    return newUserData
}

function startStopRouteReducer(userData: userData, started: boolean): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.started = started;
    return newUserData
}

function completeTourReducer(userData: userData): userData {
    const newUserData = deepClone(userData) as userData;
    if(newUserData.selectedTourId !== undefined && !newUserData.completedTouresId.includes(newUserData.selectedTourId)) {
        newUserData.completedTouresId.push(newUserData.selectedTourId)
    }
    newUserData.selectedTourId = undefined;
    newUserData.routeState = [];
    newUserData.started = false;
    return newUserData
}

function passRoutePointReducer(userData: userData, number: number): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.routeState[number - 1].passed = true;
    return newUserData;
}

export { selectTourReducer, startStopRouteReducer, completeTourReducer, passRoutePointReducer }