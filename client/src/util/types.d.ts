namespace models {
    declare interface Resume {
        _id: string,
        title: string,
        content: string[]
    }
    
    declare interface Module { 
        _id: string,
        type: number, 
        title: string, 
        content: any, 
        in_use: boolean 
    }
}
