import { action, observable, computed, reaction } from "mobx";
import { DiscClient } from "../apiClients";
import { Disc } from "../../../discgolfapp-backend/src/entity/Disc";
import { RootStore } from "./";

export class DiscStore {
    @observable public discs: Disc[] = [];
    @observable public selectedDiscs: Disc[] = [];
    @observable public searchTerm: string = "";

    private rootStore: RootStore;

    // TODO: move to /shared/clients.ts
    private dc: DiscClient = new DiscClient({
        apiUrl: "http://localhost:8001/discs"//"http://155.4.48.209/api/discs",
    });

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.reactOnSelectedForUrl();
    }
    
    @computed public get searchedDiscs() {
        return this.discs.filter(
            (d: Disc) => d.model.toLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
                d.manufacturer.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
        );
    }

    @action("Add disc to selected")
    public addDiscToSelected = (disc: Disc): void => {
        this.selectedDiscs.push(disc);
    }

    @action("Remove disc from selected")
    public removeDiscFromSelected = (disc: Disc): void => {
        const deleteIndex = this.selectedDiscs.findIndex((d) => d.id === disc.id);
        this.selectedDiscs.splice(deleteIndex, 1);
    }

    @action("GetDiscs")
    public getDiscs() {
        this.dc.getDiscs()
            .then((discs: Disc[]) => {
                this.discs = discs;
            });
    }

    public deleteDisc(id: number) {
        this.dc.deleteDisc(id)
            .then((() => {
                const deleteIndex = this.discs.findIndex((d: Disc) => d.id === id);
                if (deleteIndex !== -1) {
                    this.discs.splice(deleteIndex, 1);
                }
                const deleteSelectedIndex = this.selectedDiscs.findIndex((d: Disc) => d.id === id);
                if (deleteSelectedIndex !== -1) {
                    this.selectedDiscs.splice(deleteSelectedIndex, 1);
                }
            }));
    }

    public deleteSelectedDiscs = (): void => {
        this.selectedDiscs.forEach((disc) => this.deleteDisc(disc.id));
    }

    private reactOnSelectedForUrl = (): void => {
        reaction(
            () => this.selectedDiscs.map(d => d.id),
            (discIds: number[]) => {
                const pathString = discIds.join(",");
                this.rootStore.appStore.history.replace("/discs/" + pathString);
            }
        )
    }
}
