export interface Subtask {
    id: number, 
    taskId: number,
    title: string,
    description?: string,
    state?: boolean,
}

export interface CreateSubtask {
    taskId: number,
    title: string,
    description?: string,
    state?: boolean,
}
