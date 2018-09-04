import * as React from "react";
import { stringUtils } from "../../utils/stringUtils";

import "./Table.scss";

interface ITableProps<T, K, V> {
    columnKeys?: K[];
    items?: T[];
    onRenderCell?: (item: V) => JSX.Element | string;
    onSortByClick?: (key: K) => void;
}

export class Table<T, K extends keyof T> extends React.Component<ITableProps<T, K, T[K]>, {}> {

    public render() {
        const { columnKeys, items, onRenderCell } = this.props;
        return (
            <table className="dg-Table">
                <tbody>
                    <tr className="table__head">
                        {columnKeys !== undefined && columnKeys.length &&
                            columnKeys.map((ck, i) => (
                                <td key={i} className="table__cell head__cell">
                                    {stringUtils.capitalize(ck.toString())}
                                </td>
                            ))
                        }
                    </tr>
                    {!!items && !!items.length &&
                    items.map((item, i1) => (
                        <tr key={i1} className="table__row">
                            {columnKeys.map((key, i2) => (
                                <td key={i2} className="table__cell row__cell">
                                    {onRenderCell(item[key])}
                                </td>
                            ))}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        );
    }
}
