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
}

type RoutePoint = {
    placeId: string;
    state: "default" | "active" | "finished";
}

type Tour = {
    id: string;
    name: string;
    image: string;
    description: string;
    places: Array<Place>;
}

type Place = {
    id: string;
    name: string;
    image: string;
    description: string;
    coordinates: Position;
    address: string;
}

type PointInfo = {
    coordinates: Array<number>;
    state: "default" | "active" | "finished";
}

export type { State, userData, Tour, RoutePoint, Place, PointInfo }