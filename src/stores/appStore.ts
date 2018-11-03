import { History } from "history";
import { RootStore } from "./";

export class AppStore {

    private rootStore: RootStore;
    public history: History;

    constructor(rootStore: RootStore, history: History) {
        this.rootStore = rootStore;
        this.history = history;
    }
}