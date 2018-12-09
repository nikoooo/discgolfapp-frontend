import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { action, computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Disc } from "../../../../discgolfapp-backend/src/entity/Disc";
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
            (d: Disc) => d.model.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                d.manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
                    columnKeys={["model", "plastic", "manufacturer", "speed", "glide", "turn", "fade"]}
                    onRenderCell={this.onRenderCell}
                />

                <div className="components-discList">
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
                                    disc={d}
                                />
                            ))}
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
        if (selectedDiscs.some((d) => d.id === disc.id)) {
            removeDiscFromSelected(disc);
        } else {
            addDiscToSelected(disc);
        }
    }

    private isSelected = (disc: Disc): boolean => {
        return this.props.rootStore.discStore.selectedDiscs.some(
            (d: Disc) => d.id === disc.id,
        );
    }

}
