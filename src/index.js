import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import TestStore from "./TestStore";
import {Provider} from "mobx-react";
import GithubStore from "./GithubStore";
import ShareprocStore from "./ShareprocStore";

const stores = {
    test: new TestStore(),
    github: new GithubStore(),
    shareproc: new ShareprocStore(),
};

// All our stores are listed here
function createStores(state, token) {

    return {
        test: new TestStore(),
        github: new GithubStore(),
        shareproc: new ShareprocStore(),
    }
}

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

// Initialize actions and state
export default (typeof window !== "undefined" ? createStores(window.__STATE) : createStores)
