import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { observer } from "mobx-react";
import * as React from "react";
import { Button } from "../../../node_modules/@material-ui/core";
import { action, computed } from "../../../node_modules/mobx";
import { Disc } from "../../models/Disc";
import { RootStore } from "../../stores/rootStore";
import { DiscCard } from "../DiscCard/DiscCard";
import { Table } from "../Table/Table";

import "./DiscList.scss";

@observer
export class DiscList extends React.Component<{ rootStore: RootStore }, {}> {

    public componentWillMount() {
        this.props.rootStore.discStore.getDiscs();
    }

    @computed public get filteredList() {
        const { discs, searchTerm } = this.props.rootStore.discStore;
        return discs.filter(
            (d: Disc) => d.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                d.company.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }
    @action("Set searchTerm")
    public onSearchTermChanged = (event: any) => {
        this.props.rootStore.discStore.searchTerm = event.target.value;
    }

    public render() {
        const { deleteSelectedDiscs, selectedDiscs } = this.props.rootStore.discStore;

        return (
            <React.Fragment>
                <Table
                    items={selectedDiscs}
                    columnKeys={["name", "plastic", "company", "speed", "glide", "turn", "fade"]}
                    onRenderCell={this.onRenderCell}
                />

                <div className="components-discList">
                    <div>
                        <FormControl className="discList__search">
                            <InputLabel htmlFor="name-simple">Search</InputLabel>
                            <Input
                                id="name-simple"
                                onChange={this.onSearchTermChanged}
                            />
                        </FormControl>

                        {!!selectedDiscs.length &&
                            <Button color="secondary" onClick={deleteSelectedDiscs}>
                                Delete
                            </Button>
                        }

                        <div className="discList__listwrapper">
                            {this.filteredList
                                .slice(0, 300).map((d, i) => (
                                    <DiscCard
                                        key={i}
                                        onClick={this.itemClick}
                                        selected={this.isSelected(d)}
                                        disc={{
                                            _id: d._id,
                                            company: d.company,
                                            fade: d.fade,
                                            glide: d.glide,
                                            imgUrl: d.imgUrl,
                                            name: d.name,
                                            plastic: d.plastic,
                                            speed: d.speed,
                                            turn: d.turn,
                                            type: d.type,
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private onRenderCell = (item: string): JSX.Element | string => {
        return item;
    }

    private itemClick = (disc: Disc): void => {
        const {
            addDiscToSelected,
            removeDiscFromSelected,
            selectedDiscs,
        } = this.props.rootStore.discStore;
        if (selectedDiscs.some((d) => d._id === disc._id)) {
            removeDiscFromSelected(disc);
        } else {
            addDiscToSelected(disc);
        }
    }

    private isSelected = (disc: Disc): boolean => {
        return this.props.rootStore.discStore.selectedDiscs.some(
            (d: Disc) => d._id === disc._id,
        );
    }

}
