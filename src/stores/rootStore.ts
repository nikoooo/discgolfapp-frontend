import { DiscStore } from "./discStore";

export class RootStore {

    public discStore: DiscStore;

    constructor() {
        this.discStore = new DiscStore(this);
    }

}
