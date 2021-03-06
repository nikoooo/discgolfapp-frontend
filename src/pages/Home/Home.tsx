import * as React from "react";
import { action } from "mobx";
import { observer, inject } from "mobx-react";
import {
  FormControl,
  Grid,
  Input,
  InputLabel
} from "@material-ui/core";
import { Disc } from "../../models/Disc";
import { DiscViewsPivot } from "../../components/DiscsViewsPivot/DiscsViewsPivot";
import { InjectedProps } from "../../app";

import "./Home.scss";

@inject("rootStore")
@observer
export class Home extends React.Component<{}, {}> {

  private get injected(): InjectedProps {
    return this.props as InjectedProps;
  }

  public componentWillMount() {
    this.injected.rootStore.discStore.getDiscs();
  }

  @action("Set searchTerm")
  public onSearchTermChanged = (event: any) => {
    this.injected.rootStore.discStore.searchTerm = event.target.value;
  }

  public render() {
    const { searchedDiscs } = this.injected.rootStore.discStore
    return (
      <div className="page-home">

        <Grid container alignItems="center" justify="center">
          <Grid item xs={9} sm={6}>
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
    } = this.injected.rootStore.discStore;
    if (selectedDiscs.some((d) => d._id === disc._id)) {
      removeDiscFromSelected(disc);
    } else {
      addDiscToSelected(disc);
    }
  }

  private isSelected = (disc: Disc): boolean => {
    return this.injected.rootStore.discStore.selectedDiscs.some(
      (d: Disc) => d._id === disc._id,
    );
  }
}
