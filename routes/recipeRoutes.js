const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Public route for all recipes
router.get('/', recipeController.getAllRecipes);

// Route requires login
router.get('/:id', authenticateToken, recipeController.getRecipeById);

// Route to create a new recipe this will only be available for logged in users
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'user'), // 'user' and 'admin' roles
  recipeController.createRecipe
);

// Route to update a recipe  (admin only)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  recipeController.updateRecipe
);

// Route to delete a recipe (only admins)
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  recipeController.deleteRecipe
);

module.exports = router;