
declare namespace Express {
    interface User {
        _id: string,
        name: string,
        photo: string
    }
    export interface Request {
       user?: User | undefined;
    }
 }
