import * as React from "react";
import { action, computed } from "mobx";
import { observer } from "mobx-react";
import { RootStore } from "../../stores/rootStore";
import {
  FormControl,
  Grid,
  Input,
  InputLabel
} from "@material-ui/core";
import { Disc } from "../../models/Disc";
import { DiscGrid } from "../../components/DiscGrid/DiscGrid";

import "./Home.scss";
import { DiscViewsPivot } from "../../components/DiscsViewsPivot/DiscsViewsPivot";

interface IProps {
  rootStore: RootStore;
}

@observer
export class Home extends React.Component<IProps, {}> {

  public componentWillMount() {
    this.props.rootStore.discStore.getDiscs();
  }

  @action("Set searchTerm")
  public onSearchTermChanged = (event: any) => {
    this.props.rootStore.discStore.searchTerm = event.target.value;
  }

  public render() {
    const { searchedDiscs } = this.props.rootStore.discStore
    return (
      <div className="page-home">

        <Grid container alignItems="center" justify="center">
          <Grid item xs={5}>
            <FormControl className="home__searchfield">
              <InputLabel htmlFor="input-search">Search</InputLabel>
              <Input
                id="input-search"
                onChange={this.onSearchTermChanged}
              />
            </FormControl>
          </Grid>
        </Grid>
        
        <DiscViewsPivot
          discs={searchedDiscs}
          isSelected={this.isSelected}
          onDiscSelected={this.onDiscSelected}
        />
      </div>
    );
  }

  private onDiscSelected = (disc: Disc): void => {
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
