import { deepClone } from '../core/functions/deepClone';
import { userData } from './types'

function selectTourReducer(userData: userData, tourId: string): userData {
    const newUserData = deepClone(userData) as userData;
    newUserData.selectedTourId = tourId;
    return newUserData
}

export { selectTourReducer }