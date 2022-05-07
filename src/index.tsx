import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './model/store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TourSelect from './routes/tourSelect/TourSelect';
import App from './App';

const rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)

//--openssl-legacy-provider 
{/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<TourSelect />} />

            </Routes>
        </BrowserRouter> */}