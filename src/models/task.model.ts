export interface CreateTask {
    blockId: number,
    title: string,
    description?: string,
    state?: boolean,
    noteId?: number,
}
