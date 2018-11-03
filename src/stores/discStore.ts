import { action, observable, computed, reaction } from "mobx";
import { DiscClient } from "../apiClients";
import { Disc } from "../models/Disc";
import { RootStore } from "./";

export class DiscStore {
    @observable public discs: Disc[] = [];
    @observable public selectedDiscs: Disc[] = [];
    @observable public searchTerm: string = "";

    private rootStore: RootStore;

    // TODO: move to /shared/clients.ts
    private dc: DiscClient = new DiscClient({
        apiUrl: "http://155.4.48.209/api/discs",
    });

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.reactOnSelectedForUrl();
    }

    @computed public get searchedDiscs() {
        return this.discs.filter(
            (d: Disc) => d.name.toLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
                d.manufacturer.toLowerCase().includes(this.searchTerm.toLowerCase()),
        );
    }

    @action("Add disc to selected")
    public addDiscToSelected = (disc: Disc): void => {
        this.selectedDiscs.push(disc);
    }

    @action("Remove disc from selected")
    public removeDiscFromSelected = (disc: Disc): void => {
        const deleteIndex = this.selectedDiscs.findIndex((d) => d._id === disc._id);
        this.selectedDiscs.splice(deleteIndex, 1);
    }

    public createDisc() {
        this.dc.createDisc(new Disc({
            manufacturer: "Niko",
            fade: 1,
            glide: 1,
            imgUrl: "",
            name: "nikodisc",
            plastic: "kasta",
            speed: 1,
            turn: 1,
            type: "Distance Driver",
        }));
    }

    @action("GetDiscs")
    public getDiscs() {
        this.dc.getDiscs()
            .then((discs: Disc[]) => {
                if (discs) {
                    this.discs = discs;
                    // this.deleteAllDiscs();
                    // this.deleteDuplicates();
                    this.extractPlastics();
                }
            },
            _ => {
                let imgs = ["discs/innova/dx_aviar_b.jpg", "discs/innova/dx_valkyrie_b.jpg", "discs/discraft/z-buzzz_b.jpg"];

                let discs: Disc[] = [
                    new Disc({}),
                    new Disc({}),
                    new Disc({}),
                    new Disc({})
                ];

                const mappedDiscs = discs.map((_, i) => {
                    return new Disc({
                        _id: i.toString(),
                        imgUrl : imgs[Math.floor(3 - (3 * Math.random()))],
                        manufacturer: "Innova",
                        name: "fake",
                        plastic: "best",
                        speed: Math.floor(Math.random() * 10),
                        turn: Math.floor(Math.random() * 10),
                        fade: Math.floor(Math.random() * 10),
                        glide: Math.floor(Math.random() * 10)
                    });
                });
                this.discs = mappedDiscs;
            });
    }

    public deleteDisc(id: string) {
        this.dc.deleteDisc(id)
            .then((() => {
                const deleteIndex = this.discs.findIndex((d: Disc) => d._id === id);
                if (deleteIndex !== -1) {
                    this.discs.splice(deleteIndex, 1);
                }
                const deleteSelectedIndex = this.selectedDiscs.findIndex((d: Disc) => d._id === id);
                if (deleteSelectedIndex !== -1) {
                    this.selectedDiscs.splice(deleteSelectedIndex, 1);
                }
            }));
    }

    public deleteSelectedDiscs = (): void => {
        this.selectedDiscs.forEach((disc) => this.deleteDisc(disc._id));
    }

    // DB Management
    private extractPlastics() {
        // Innova
        const plastics = [
            // Innova
            { company: "Innova", name: "USDGC Champion" },
            { company: "Innova", name: "Blizzard Champion" },
            { company: "Innova", name: "Champion Glow" },
            { company: "Innova", name: "Champion Luster" },
            { company: "Innova", name: "Champion" },
            { company: "Innova", name: "Star Lite" },
            { company: "Innova", name: "GStar" },
            { company: "Innova", name: "Echo Star" },
            { company: "Innova", name: "Star" },
            { company: "Innova", name: "DX Glow" },
            { company: "Innova", name: "DX" },
            { company: "Innova", name: "KC Pro" },
            { company: "Innova", name: "Pro D" },
            { company: "Innova", name: "JK Pro" },
            { company: "Innova", name: "R-Pro" },
            { company: "Innova", name: "Yeti Pro" },
            { company: "Innova", name: "Pro" },
            { company: "Kastaplast", name: "K1 Glow" },
            { company: "Kastaplast", name: "K1" },
            { company: "Kastaplast", name: "K2" },
            { company: "Kastaplast", name: "K3" },
            { company: "Prodigy", name: "200" },
            { company: "Prodigy", name: "300" },
            { company: "Prodigy", name: "350Rx Lightweight Proto" },
            { company: "Prodigy", name: "350G Light" },
            { company: "Prodigy", name: "350 Light" },
            { company: "Prodigy", name: "350G" },
            { company: "Prodigy", name: "400G Glow" },
            { company: "Prodigy", name: "400G Light" },
            { company: "Prodigy", name: "400 Glow" },
            { company: "Prodigy", name: "400G" },
            { company: "Prodigy", name: "400" },
            { company: "Prodigy", name: "750" },
            { company: "Prodigy", name: "AIR" },
            { company: "Westside", name: "Tournament" },
            { company: "Westside", name: "VIP Air" },
            { company: "Westside", name: "VIP Moonshine" },
            { company: "Westside", name: "VIP" },
            { company: "Westside", name: "BT Soft" },
            { company: "Westside", name: "BT Mega Soft" },
            { company: "Westside", name: "BT Medium" },
            { company: "Westside", name: "BT Hard" },
            { company: "Westside", name: "Elasto" },
            { company: "Westside", name: "Origio" },
            { company: "Westside", name: "DyeMax" },
            { company: "Westside", name: "DecoDye" },
            { company: "Viking Discs", name: "Ground" },
            { company: "Viking Discs", name: "Storm" },
            { company: "Viking Discs", name: "Armor" },
            { company: "MVP Disc Sports", name: "Neutron" },
            { company: "MVP Disc Sports", name: "Proton" },
            { company: "MVP Disc Sports", name: "Eclipse Glow" },
            { company: "MVP Disc Sports", name: "Eclipse" },
            { company: "MVP Disc Sports", name: "Electron" },
            { company: "MVP Disc Sports", name: "Plasma" },
            { company: "MVP Disc Sports", name: "Fission" },
            { company: "Discraft", name: "Pro D" },
            { company: "Discraft", name: "Elite X" },
            { company: "Discraft", name: "X Soft" },
            { company: "Discraft", name: "X" },
            { company: "Discraft", name: "Elite Z" },
            { company: "Discraft", name: "Z Glo" },
            { company: "Discraft", name: "Z" },
            { company: "Discraft", name: "FLX" },
            { company: "Discraft", name: "Ti" },
            { company: "Discraft", name: "ESP" },
            { company: "Millenium", name: "Quantum" },
            { company: "Millenium", name: "M-line" },
            { company: "Millenium", name: "Sirius" },
            { company: "DGA", name: "Pro" },
            { company: "DGA", name: "Signature" },
            { company: "DGA", name: "SP" },
            { company: "DGA", name: "RDGA" },
            { company: "DGA", name: "D" },
            { company: "DGA", name: "FLX" },
            { company: "DGA", name: "Flex" },
            { company: "Gateway", name: "S-Series Super Stupid Soft" },
            { company: "Gateway", name: "S-Series Super Soft" },
            { company: "Gateway", name: "S-Series Soft" },
            { company: "Gateway", name: "S-Series" },
            { company: "Gateway", name: "E-Series" },
            { company: "Gateway", name: "G-Series" },
            { company: "Gateway", name: "Special Blend" },
            { company: "Gateway", name: "Eraser" },
            { company: "Gateway", name: "RFF" },
            { company: "Latitude 64", name: "Gold" },
            { company: "Latitude 64", name: "Opto Light" },
            { company: "Latitude 64", name: "Opto Air" },
            { company: "Latitude 64", name: "Opto Moonshine" },
            { company: "Latitude 64", name: "Opto Blank" },
            { company: "Latitude 64", name: "Opto" },
            { company: "Latitude 64", name: "Recycled" },
            { company: "Latitude 64", name: "Zero Soft" },
            { company: "Latitude 64", name: "Zero Hard" },
            { company: "Latitude 64", name: "Zero" },
            { company: "Latitude 64", name: "Frost" },
            { company: "Latitude 64", name: "Air" },
            { company: "Discmania", name: "Luster C-Line" },
            { company: "Discmania", name: "Glow C-Line" },
            { company: "Discmania", name: "C-Line" },
            { company: "Discmania", name: "Glow D-Line" },
            { company: "Discmania", name: "D-Line" },
            { company: "Discmania", name: "Stiff P-Line" },
            { company: "Discmania", name: "P-Line" },
            { company: "Discmania", name: "Swirly S-Line" },
            { company: "Discmania", name: "S-Line" },
            { company: "Discmania", name: "G-Line" },
            { company: "Discmania", name: "X-Line" },
            { company: "Discmania", name: "Lady Line" },
        ];
        this.discs.forEach((disc: Disc) => {
            let extracted = false;
            plastics.forEach((plastic) => {
                if (disc.manufacturer === plastic.company && !extracted) {
                    const discName = disc.name.toLowerCase().replace("  ", " ");
                    const plasticName = plastic.name.toLowerCase();
                    const indexOf = discName.indexOf(plasticName);
                    const onlyPlastic = new RegExp("([^a-zA-Z0-9]|^)" + plasticName + "([^a-zA-Z0-9]|$)")
                        .test(discName);
                    if (indexOf !== -1 && onlyPlastic) {
                        const dirtyName = (disc.name.substring(0, indexOf) +
                            disc.name.substring(indexOf + plasticName.length)).trim();
                        const newName = dirtyName.replace("  ", " ");
                        /*this.dc.updateDisc(
                            disc._id,
                            {
                                name: newName,
                                plastic: plastic.name,
                            },
                        );*/
                        console.log("old: >" + disc.name + "<, new: >" + newName + "<    found: " + plastic.name);
                        extracted = true;
                    }
                }
            });
        });
    }

    private reactOnSelectedForUrl = (): void => {
        reaction(
            () => this.selectedDiscs.map(d => d._id),
            (discIds: string[]) => {
                const pathString = discIds.join(",");
                this.rootStore.appStore.history.replace("/discs/" + pathString);
            }
        )
    }
}
