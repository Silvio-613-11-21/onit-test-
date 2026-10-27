export interface Task{
    id: number, 
    blockId: number,
    title: string,
    description?: string,
    state?: boolean,
    noteId?: number,
}

export interface CreateTask {
    blockId: number,
    title: string,
    description?: string,
    state?: boolean,
    noteId?: number,
}
