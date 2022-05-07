import { Position } from '../core/types/types';

type State = {
    //page: "landing" | "map" | "tourView" | "routeView" | "routeGo";
    //menuStretching: "none" | "half" | "full";
    //menuState: "initial" | "townSelect" | "routeView" | "placeView" | "routeGo";
    userData: userData;
    tours: Array<Tour>;
}

type userData = {
    selectedTourId: string;
    routeState: Array<RoutePoint>
    completedTouresId: Array<string>;
    started: boolean;
}

type RoutePoint = {
    placeId: string;
    passed: boolean;
}

type Tour = {
    id: string;
    name: string;
    img: string;
    description: string;
    places: Array<Place>;
}

type Place = {
    id: string;
    name: string;
    img?: string;
    description: string;
    coordinates: Position;
}

export type { State, userData, Tour, RoutePoint }