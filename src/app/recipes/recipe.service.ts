import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      // '/assets/Pizza@2x.png',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      2,
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      // 'assets/Wings@2x.png',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])];

  constructor(private shoppingListService: ShoppingListService) {

  }

  addIngredientToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addItemToIngredient(ingredients);
  }

  getRecipies(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {

    return this.recipes.find(
      (recipe) => {
        return recipe.id === id;
      }
    );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
  }

  addRecipe(recipe: Recipe): void {
    recipe.id = this.recipes.length + 1;
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, newRecipe: Recipe): void {
    const index = this.recipes.findIndex(
      (recipe) => {
        return recipe.id === id;
      }
    );

    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    const index = this.recipes.findIndex(
      (recipe) => {
        return recipe.id === id;
      }
    );
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
