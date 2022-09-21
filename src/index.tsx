import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {HashRouter} from "react-router-dom";
import {store} from "./bll/store";
import {Provider} from "react-redux";
import {App} from "./ui/app/App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter >
);

reportWebVitals();
