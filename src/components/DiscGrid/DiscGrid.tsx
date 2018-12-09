import { observer } from "mobx-react";
import * as React from "react";
import { Disc } from "../../../../discgolfapp-backend/src/entity/Disc";
import { DiscCard } from "../DiscCard/DiscCard";
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
                                disc={d}
                            />
                        ))}
                </div>
            </div>
        );
    }
}
