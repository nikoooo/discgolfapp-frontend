import * as React from "react";
import { action, observable } from "mobx";
import { observer } from "../../../node_modules/mobx-react";

import { Disc } from "../../models/Disc";
import { DiscGrid } from "../DiscGrid/DiscGrid";

import ListIcon from '@material-ui/icons/List';
import GridOnIcon from '@material-ui/icons/GridOn';
import { Table } from "../Table/Table";

type ViewType = "grid" | "table";

interface IDiscsViewsPivotProps {
  discs?: Disc[];
  isSelected?: (disc: Disc) => boolean;
  onDiscSelected?: (disc: Disc) => void;
}

@observer
export class DiscViewsPivot extends React.Component<IDiscsViewsPivotProps, {}> {

 @observable private activeType: ViewType = "grid";

  @action("Set active view type")
  private onToggleClick = (vType: ViewType): void => {
    this.activeType = vType;
  }

  private onRenderToolbar = () => (
    <React.Fragment>
      <GridOnIcon
        className="discViewsPivot__toggler"
        onClick={this.onToggleClick.bind(null, "grid")}
      />
      <ListIcon
        className="discViewsPivot__toggler"
        onClick={this.onToggleClick.bind(null, "table")}
      />
    </React.Fragment>
  );

  public render() {
    const { discs, isSelected, onDiscSelected } = this.props;
    return (
      <div className="dg-discViewsPivot">
        <div className="discViewsPivot__toggleContent">
        {this.activeType === "grid" ? 
          ((discs && !!discs.length &&
            <DiscGrid
              discs={discs.slice(0, 30)}
              onDiscClick={onDiscSelected}
              isSelected={isSelected}
              onRenderToolbar={
                this.activeType === "grid" ? this.onRenderToolbar : undefined
              }
            />
          ) || "No discs or loading...") :
          (
            <Table
              items={discs.slice(0, 30)}
              columnKeys={["name", "manufacturer", "speed", "glide", "turn", "fade"]}
              onRenderToolbar={
                this.activeType === "table" ? this.onRenderToolbar : undefined
              }
            />
          )
        }
        </div>
      </div>
    );
  }
}