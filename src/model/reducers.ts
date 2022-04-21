import { deepClone } from '../core/functions/deepClone';
import { userData } from './types'

function selectTourReducer(userData: userData, tourId: string): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.selectedTourId = tourId;
    return newUserData
}

function startStopRouteReducer(userData: userData, started: boolean): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.started = started;
    return newUserData
}

function completeToureReducer(userData: userData): userData {
    const newUserData = deepClone(userData) as userData;
    if(newUserData.selectedTourId !== undefined && !newUserData.completedTouresId.includes(newUserData.selectedTourId)) {
        newUserData.completedTouresId.push(newUserData.selectedTourId)
    }
    newUserData.selectedTourId = undefined;
    newUserData.routeState = [];
    newUserData.started = false;
    return newUserData
}

export { selectTourReducer }