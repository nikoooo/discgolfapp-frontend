export interface IDisc {
    company?: string;
    fade?: number;
    glide?: number;
    imgUrl?: string;
    _id?: string;
    name?: string;
    plastic?: string;
    speed?: number;
    turn?: number;
    type?: string;
}

export class Disc implements IDisc {

    public company?: string;
    public fade?: number;
    public glide?: number;
    public _id?: string;
    public imgUrl?: string;
    public name?: string;
    public plastic?: string;
    public speed?: number;
    public turn?: number;
    public type?: string;

    constructor(disc: IDisc) {
        this.company = disc.company;
        this.fade = disc.fade;
        this.glide = disc.glide;
        this.imgUrl = disc.imgUrl;
        this._id = disc._id;
        this.name = disc.name;
        this.plastic = disc.plastic;
        this.speed = disc.speed;
        this.turn = disc.turn;
        this.type = disc.type;
    }
}
