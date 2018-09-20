import * as React from "react";
import { DiscCard } from "../DiscCard/DiscCard";
import { Disc } from "../../models/Disc";
import { observer } from "mobx-react";

import "./DiscGrid.scss";

interface IProps {
    discs?: Disc[];
    onDiscClick?: (d: Disc) => void;
    isSelected?: (d: Disc) => boolean;
    onRenderToolbar?: () => JSX.Element;
}

@observer
export class DiscGrid extends React.Component<IProps, {}> {

    public render() {
        const { discs, onDiscClick, isSelected, onRenderToolbar } = this.props;
        return (
            <div className="dg-discGrid">
                <div className="discGrid__wrapper--inline">
                    <div className="discGrid__toolbar">
                        {onRenderToolbar && onRenderToolbar()}
                    </div>
                    {!!discs && discs
                        .slice(0, 300).map((d, i) => (
                            <DiscCard
                                key={i}
                                onClick={onDiscClick}
                                selected={!!isSelected ? isSelected(d) : false}
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
        );
    }
}
