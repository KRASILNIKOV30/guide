import { Position } from '../core/types/types';

type State = {
    //page: "landing" | "map" | "tourView" | "routeView" | "routeGo";
    //menuStretching: "none" | "half" | "full";
    //menuState: "initial" | "townSelect" | "routeView" | "placeView" | "routeGo";
    userData: userData;
    towns: Array<Town>;
}

type userData = {
    selectedTownId?: string;
    selectedTourId?: string;
    routeState: Array<RoutePoint>
    completedToures: Array<string>;
    started: boolean;
}

type RoutePoint = {
    placeId: string;
    passed: boolean;
}

type Town = {
    id: string;
    name: string;
    tours: Array<Tour>;
}

type Tour = {
    id: string;
    name: string;
    img?: string;
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

export type { State }