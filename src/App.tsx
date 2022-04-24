import DeckGL from '../node_modules/@deck.gl/react';
import {LineLayer, PathLayer} from '../node_modules/@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {MapView} from '../node_modules/@deck.gl/core';

const INITIAL_VIEW_STATE = {
    longitude: 47.8896,
    latitude:  56.6418,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia3Jhc2lsbmlrb3YzMCIsImEiOiJja3owODh1OGwwMjE2MnBwcXlkNGpwZ281In0.Ep9Yn349-UgsCl8SPEroHQ';

const dataLine = [
    {
        sourcePosition: [56.6418, 47.8896],
        targetPosition: [56.6418, 47.8896]
    }
];

const dataPath = [
    {
        path: [[56.641854, 47.889654], [58.000000, 48.000000], [56.000078, 47.000078]],
        name: 'Test route',
        color: [255, 0, 0]
    }
]

type dataPathType = typeof dataPath[0];

const App = () => {
    const layers = [
        new LineLayer({id: 'line-layer', dataLine}),
        new PathLayer({
            id: 'path-layer',
            dataPath,
            pickable: true,
            widthScale: 10,
            widthMinPixels: 20,
            getPath: (d: dataPathType) => d.path
        })
      ];
    
    return ( 
        <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={layers}
            getTooltip={(object: dataPathType) => object && object.name}
        >
            <MapView id="map" width="100%" controller={true}>
                <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            </MapView>
        </DeckGL>
    )    

}

export { App }