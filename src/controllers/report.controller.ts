//сервисы
import  createMdFileContent  from "../services/createMdFileContent.ts";
//

//репы 
import { getBlockById } from "../repositories/block.rep.ts";
import { getNotesByBlockId } from "../repositories/note.rep.ts";
import { getTasksByBlockId } from "../repositories/task.rep.ts";

import { getSubtasksByTaskId } from "../repositories/subtask.rep.ts";
//

//тир
import { Subtask } from "../models/subtask.model.ts";
//

//из либы
import type { Request, Response } from "express";
//

export class ReportController{
    async createReportByBlockIg(req: Request, res: Response) {
        const { id }  = req.params as { id: string }

        const blockNumId = parseInt(id);

        if (isNaN(blockNumId)) {
            return res.status(400).json({ error: "Некорректный ID" });
        }

        try{
            let blocks = await getBlockById(blockNumId);
            let notes = await getNotesByBlockId(blocks[0].id)
            let tasks = await getTasksByBlockId(blocks[0].id)

            let subtasks: Subtask[][] = [];
            for (const task of tasks){
                let subtask = await getSubtasksByTaskId(task.id)
                subtasks.push(subtask)
            }

            let fileContent = createMdFileContent(blocks, tasks, subtasks, notes)
        }
        catch(e){
            console.error(e)
        }

    }
}

export default new ReportController() 