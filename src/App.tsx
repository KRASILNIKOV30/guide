import DeckGL from '../node_modules/@deck.gl/react';
import {LineLayer, PathLayer} from '../node_modules/@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import {MapView, FirstPersonView} from '../node_modules/@deck.gl/core';

const INITIAL_VIEW_STATE = {
    longitude: 47.8896,
    latitude:  56.6418,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

//curl 'http://router.project-osrm.org/route/v1/driving/56.6418,47.889690;56.641890,47.879654;56.741888,47.889612?overview=false'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia3Jhc2lsbmlrb3YzMCIsImEiOiJja3owODh1OGwwMjE2MnBwcXlkNGpwZ281In0.Ep9Yn349-UgsCl8SPEroHQ';

const dataLine = [
    {
        sourcePosition: [56.6418, 47.8896],
        targetPosition: [56.6418, 47.8896]
    }
];

const dataPath = [
    {
        path: [[56.6418, 47.8896], [57.0000, 48.0000], [56.0000, 47.0000]],
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
            <FirstPersonView width="50%" x="50%" fovy={50} />
        </DeckGL>
    )    

}

export { App }