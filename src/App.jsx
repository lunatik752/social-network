import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Main from "./Main";
import store from "./redux/redux-store";


function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <Main/>
            </Provider>
        </HashRouter>
    );
}

export default App;




