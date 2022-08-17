import { Router } from 'express';
import multer from 'multer';

import { createCategoryControllerFactory } from '../../../../modules/cars/useCases/createCategory/createCategoryControllerFactory';
import { importCategoryControllerFactory } from '../../../../modules/cars/useCases/importCategory/importCategoryFactory';
import { listCategoriesControllerFactory } from '../../../../modules/cars/useCases/listCategories/listCategoriesControllerFactory';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const categoriesRoutes = Router();

const upload = multer({
  dest: './temp',
});

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, async (request, response) => {
  const createCategoryController = createCategoryControllerFactory();
  return await createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', async (request, response) => {
  const listCategoriesController = listCategoriesControllerFactory();
  return await listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', ensureAuthenticated, ensureAdmin, upload.single('file'), async (request, response) => {
  const importCategoryController = importCategoryControllerFactory();
  return await importCategoryController.handle(request, response);
});
