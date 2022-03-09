import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
// import {PersistGate} from 'redux-persist/integration/react';
import store from './Store';
import './App.css';
import App from './App';


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            {/*<PersistGate persistor={persistor}>*/}
            <App/>
            {/*</PersistGate>*/}
        </Provider>
    </BrowserRouter>

    , document.getElementById('root')
);
