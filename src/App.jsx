import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Main from "./Main";
import store from "./redux/redux-store";


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




