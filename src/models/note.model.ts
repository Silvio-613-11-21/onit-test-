export interface Note {
    id: number 
    blockId: number,
    title: string,
    description?: string,
}

export interface CreateNote {
    blockId: number,
    title: string,
    description?: string,
}
