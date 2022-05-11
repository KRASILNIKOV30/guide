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

export { selectTour, completeTour, passRoutePoint }