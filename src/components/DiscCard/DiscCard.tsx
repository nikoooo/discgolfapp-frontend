import { observer } from "mobx-react";
import * as React from "react";
import { Disc } from "../../../../discgolfapp-backend/src/entity/Disc";
import "./DiscCard.scss";

interface IDiscCardProps {
    disc: Disc;
    onClick?: (disc: Disc) => void;
    selected?: boolean;
}

export const DiscCard = observer((props: IDiscCardProps) => (
    <div
        className={"dg-discCard" + (props.selected ? " selected" : "")}
        onClick={props.onClick ? props.onClick.bind(null, props.disc) : undefined}
    >
        <div className="discCard__companyName">
            <span>{props.disc.manufacturer.name}</span>
        </div>

        <div className="discCard__img">
            <img
                src={/*"/src/assets/images/discs/" + */props.disc.imgPath}
                alt="placeholder"
            />
        </div>

        <div className="discCard__manufacturer">
            <img src={getManufacturerImagePath(props.disc.manufacturer.name)} />
        </div>

        <div className="discCard__stats">
            <div className="stats stats--speed">{props.disc.speed}</div>
            <div className="stats stats--glide">{props.disc.glide}</div>
            <div className="stats stats--turn">{props.disc.turn}</div>
            <div className="stats stats--fade">{props.disc.fade}</div>
        </div>

        <div className="discCard__discName">
            <span>{props.disc.model}</span>
        </div>
    </div>
));

function getManufacturerImagePath(manufacturer: string): string {
    const path = "/src/assets/images/manufacturers/{0}.jpg";
    switch (manufacturer) {
        case "DGA":
            return path.replace("{0}", "dga");
        case "Discmania":
            return path.replace("{0}", "discmania");
        case "Discraft":
            return path.replace("{0}", "discraft");
        case "Gateway":
            return path.replace("{0}", "gateway");
        case "Innova":
            return path.replace("{0}", "innova");
        case "Latitude 64":
            return path.replace("{0}", "latitude64");
        case "Millenium":
            return path.replace("{0}", "millenniumdiscs");
        case "MVP Disc Sports":
            return path.replace("{0}", "mvpdiscsports");
        case "Kastaplast":
            return path.replace("{0}", "kastaplast");
        case "Prodigy":
            return path.replace("{0}", "prodigy");
        case "Viking Discs":
            return path.replace("{0}", "vikingdiscs");
        case "Westside":
            return path.replace("{0}", "westsidediscs");
        default:
            return "";
    }
}
