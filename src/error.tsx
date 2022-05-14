import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './model/store';
import Page404 from './common/Page404/Page404';

const rootElement = document.getElementById('err')

ReactDOM.render(
    <Provider store={store}>
        <Page404/>
    </Provider>,
    rootElement
)