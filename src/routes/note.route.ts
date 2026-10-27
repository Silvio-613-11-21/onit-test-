import { Router } from "express";
import noteController from "../controllers/note.controller.ts";

const router = Router();

router.post('/create', noteController.create);
router.get('/getall', noteController.getAll);
router.get('/:id', noteController.getById);
router.delete('/:id', noteController.deleteById);
router.patch('/changetitle/:id', noteController.changeTitle);

export default router;
