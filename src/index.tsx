import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './model/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TourSelect from './routes/tourSelect/TourSelect';
import PreviewTour from './routes/previewTour/PreviewTour';
import PreviewMap from './routes/previewMap/PreviewMap';

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<TourSelect />} />
                <Route path="previewtour" element={<PreviewTour />} />
                <Route path="previewmap" element={<PreviewMap />} />

            </Routes>
        </BrowserRouter>
    </Provider>,
    rootElement
)