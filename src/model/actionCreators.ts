import { RoutePoint } from "./types"

function selectTour(id: string) {
    return {
        type: 'SELECT_TOUR',
        id
    }
}

function completeTour() {
    return {
        type: 'COMPLETE_TOUR'
    }
}

function passRoutePoint() {
    return {
        type: 'PASS_ROUTE_POINT'
    }
}

function loadRoute(routePoints: Array<RoutePoint>) {
    return {
        type: 'LOAD_ROUTE',
        routePoints
    }
}


export { selectTour, completeTour, passRoutePoint, loadRoute }