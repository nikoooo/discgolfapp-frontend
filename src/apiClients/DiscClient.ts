import "whatwg-fetch";
import { Disc } from "../models/Disc";
import { IClient } from "./IClient";

export class DiscClient implements IClient {
    public apiUrl: string;

    constructor(options: IClient) {
        this.apiUrl = options.apiUrl;
    }

    public createDisc(disc: Disc): Promise<Response> {
        return fetch(this.apiUrl, {
            body: JSON.stringify(disc),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    }

    public deleteDisc(id: string): Promise<Response> {
        return fetch(this.apiUrl + "/" + id, {
            method: "DELETE",
        });
    }

    public getDiscs(): Promise<void | Disc[]> {
        return fetch(this.apiUrl)
            .then((res: any) => {
                return res.json();
            }).then((json: Disc[]) => {
                return json;
            }).catch((e) => {
                console.log("parsing failed", e);
                throw e;
            });
    }

    public updateDisc(id: string, disc: Disc): Promise<Response> {
        return fetch(this.apiUrl + "/" + id, {
            body: JSON.stringify(disc),
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
        });
    }
}
