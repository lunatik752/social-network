import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let dialogs = [
    {name: 'Maks', id: '1'},
    {name: 'Aleks', id: '2'},
    {name: 'Kna', id: '3'},
    {name: 'Andy', id: '4'}
];

let messages = [
    {message: 'Hello!', id: '1'},
    {message: 'How are you? What are you doing?!', id: '2'},
    {message: 'Come with me.', id: '3'},
];

let posts = [
    {message: 'Hello!!!', countLikes: '3'},
    {message: 'This is a post.', countLikes: '12'}
];

ReactDOM.render(<App posts={posts} dialogs={dialogs} messages={messages} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
