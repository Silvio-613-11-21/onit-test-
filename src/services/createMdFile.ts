import { Block } from "../models/block.model.ts";
import { Task } from "../models/task.model.ts";
import { Subtask } from "../models/subtask.model.ts";
import { Note } from "../models/note.model.ts"

export default function createMdFile
(
    blocks: Block[], 
    tasks: Task[], 
    subtasks: Subtask[][],
    notes: Note[]
) 
{
    let content = ''

    const block  = blocks[0]
    content += addBlockTitle(block)

}

function addBlockTitle(block: Block){
    let c = ''

    c += '## '
    c += '['
    c += `${block.date}`
    c += ']'

    if(block.title){
        c += ' '
        c += `${block.title}`
    }

    c += '<br/>'
    return c
}