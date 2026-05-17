import { Router } from 'express';
import {
  createLeadController,
  deleteLeadController,
  exportLeadsController,
  getLeadByIdController,
  listLeadsController,
  updateLeadController,
} from '../controllers/lead.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { ROLES } from '../constants/roles';
import {
  createLeadSchema,
  listLeadsSchema,
  updateLeadSchema,
} from '../validations/lead.validation';

const router = Router();

router.use(authenticate);

router.get('/', validate(listLeadsSchema), listLeadsController);
router.get('/export/csv', validate(listLeadsSchema), authorize(ROLES.ADMIN), exportLeadsController);
router.get('/:id', getLeadByIdController);
router.post('/', validate(createLeadSchema), createLeadController);
router.patch('/:id', validate(updateLeadSchema), updateLeadController);
router.delete('/:id', authorize(ROLES.ADMIN), deleteLeadController);

export default router;