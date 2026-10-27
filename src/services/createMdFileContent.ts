import { Block } from "../models/block.model.ts";
import { Task } from "../models/task.model.ts";
import { Subtask } from "../models/subtask.model.ts";
import { Note } from "../models/note.model.ts"

export default function createMdFileContent
    (
        blocks: Block[],
        tasks: Task[],
        subtasks: Subtask[][],
        notes: Note[]
    ) {
    let content = ''

    const block = blocks[0]
    content += addBlockTitle(block)
    content += '## Tasks <br/>'
    content += addTasks(tasks, subtasks)
    content += '<br/>'
    content += '## Notes <br/>' 
    content += addNotes(notes)

    return content
}

function addNotes(notes: Note[]){
    let c = ''

    for(const note of notes){
        c += '- '
        c += `${note.title}`
        c += '<br/>'

        if(note.description){
            c += `${note.description}`
            c += '<br/>'
        }
    }
    
    return c
} 

function addTasks(tasks: Task[], subtasks: Subtask[][]) {
    let c = ''

    for (const task of tasks) {
        c += '\t'

        if (task.state) {
            c += '- [x] '
        }
        else {
            c += '- [ ] '
        }

        if (task.noteId) {
            c += `<a id="${task.noteId}">${task.title}</a>`
        }
        else {
            c += `${task.title}`
        }
        c += '<br/>'

        if (task.description) {
            c += '\t'
            c += `${task.description}`
            c += '<br/>'
        }

        for (const subtask of subtasks) {
            if (subtask[0].taskId != task.id) {
                break
            }
            else {

                for (const subtask_ of subtask) {
                    c += '\t\t'

                    if (subtask_.state) {
                        c += '- [x] '
                    }
                    else {
                        c += '- [ ] '
                    }

                    c += `${subtask_.title}`
                    c += '<br/>'

                    if (subtask_.description) {
                        c += '\t\t'
                        c += `${subtask_.description}`
                        c += '<br/>'
                    }
                }
            }

        }
    }

}


function addBlockTitle(block: Block) {
    let c = ''

    c += '# '
    c += '['
    c += `${block.date}`
    c += ']'

    if (block.title) {
        c += ' '
        c += `${block.title}`
    }

    c += '<br/>'
    return c
}