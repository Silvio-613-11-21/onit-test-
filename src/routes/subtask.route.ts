import { Router } from "express";
import subtaskController from "../controllers/subtask.controller.ts";

const router = Router();

router.post('/create', subtaskController.create);
router.get('/getall', subtaskController.getAll);
router.get('/:id', subtaskController.getById);
router.delete('/:id', subtaskController.deleteById);
router.patch('/changetitle/:id', subtaskController.changeTitle);

export default router;
