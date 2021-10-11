namespace models {
    declare interface Resume {
        _id: string,
        title: string,
        content: any
    }
    
    declare interface Module { 
        type: number, 
        title: string, 
        content: any, 
        in_use: boolean 
    }
}
