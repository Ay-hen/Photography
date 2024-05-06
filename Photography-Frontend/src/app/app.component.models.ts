export interface Cart {
    id:number;
    title : string;
    image : string;
    description : string;
}


export class Reservation {
    constructor(
    public id: number,
    public username: string,
    public date: string,
    public status: string,
    public type: string
    ) {}
}