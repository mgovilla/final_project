
declare type user = {
    _id: string,
    name: string,
    photo: string
}

declare namespace Express {
    export interface Request {
       user?: user
    }
 }
