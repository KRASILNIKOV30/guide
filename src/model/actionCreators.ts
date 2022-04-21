function selectTour(id: string) {
    return {
        type: 'SELECT_TOUR',
        id
    }
}

function startStopRoute(started: boolean) {
    return {
        type: 'START_STOP_ROUTE',
        started
    }
}

function completeTour() {
    return {
        type: 'COMPLETE_TOUR'
    }
}

function passRoutePoint(number: number) {
    return {
        type: 'PASS_ROUTE_POINT',
        number
    }
}

export { selectTour, startStopRoute, completeTour, passRoutePoint }