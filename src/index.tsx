import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './model/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TourSelect from './routes/tourSelect/TourSelect';
import PreviewTour from './routes/previewTour/PreviewTour';

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/tourselect" element={<TourSelect />} />
                <Route path="previewtour" element={<PreviewTour />} />
            </Routes>
        </BrowserRouter>
    </Provider>,
    rootElement
)