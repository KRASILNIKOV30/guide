type State = {
    page: "landing" | "map" | "tourView";
    menuStretching: "none" | "half" | "full";
    menuState: "initial" | "townSelect";
    selectedTownId: string;
    selectedTourId: string;
    towns: Array<Town>;
}

type Town = {
    id: string;
    name: string;
    tours: Array<Tour>;
}

type Tour = {
    id: string;
    name: string;
    img: string;
    places:
}

export type { State }