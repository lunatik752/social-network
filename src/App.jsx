import React from 'react';
import './App.css';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Main from "./Main";
import store from "./redux/store";


function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Main/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;




