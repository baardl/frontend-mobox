import fetch from 'node-fetch';
import {action, observable, decorate, extendObservable, runInAction} from "mobx"

const defaultState = {};

export default class SharprocStore {

    constructor(state = defaultState) {
        extendObservable(
            this,
            {
                processes: [],
                filter: '',
                fetchingProcesses: false,
            },
            state
        )
    }

        // this.searchName = '';
        // this.user = '';
        // this.repos = [];
        // this.fetchingData = false;
    // }

    async fetchProcesses(filter) {
        const url = `https://dev.shareproc.com/frontend/processes?filter=${filter}`;
        const response = await fetch(url);
        return await response.json();
    }

    // @action('Change User to search for')
    changeUserToSearchFor(username) {
        runInAction(() => {
            this.searchName = username;
        })
    }

    // @action('Search for user on Github')
    searchForProcesses = async () => {
        console.log("search for processes. Filter: ", this.filter);
        // if (!this.filter) return;
        this.fetchingData = true;
        const [processes] = await Promise.all([
            this.fetchProcesses(`${this.filter}`)
        ]);
        runInAction("Update State after fetching Github's Data", () => {
            this.processes = processes;
            this.fetchingProcesses = false;
        });
    };
}

decorate(SharprocStore, {
    filter:    observable.shallow,
    processes: observable.shallow,
    fetchingProcesses: observable.shallow,
    fetchFromGithub: action.bound,
    searchForProcesses: action.bound
})
