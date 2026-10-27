export interface Block {
    id: number,
    date: string,
    title?:string,
}

export interface CreateBlock {
    date: string,
    title?:string,
}