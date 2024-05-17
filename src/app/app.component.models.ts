export interface Cart {
    id              :number;
    title           : string;
    image           : string;
    description     : string;
}


export class Reservation {
    constructor(
    public id       : number,
    public username : string,
    public date     : string,
    public status   : string,
    public type     : string
    ) {}
}

export interface User{
    username    : string;
    name        : string;
    email       : string;
    password    : string;
    role        : string;
    phone       : string;
}



export interface Response{
    token       : string;
    role        : string;
}


