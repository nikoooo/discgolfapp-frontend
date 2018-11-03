import { History } from "history";
import { AppStore, DiscStore } from "./";

export class RootStore {

    public appStore: AppStore;
    public discStore: DiscStore;

    constructor(history: History) {
        this.appStore = new AppStore(this, history);
        this.discStore = new DiscStore(this);
    }

}
