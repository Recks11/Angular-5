import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
     private activeRoute: ActivatedRoute,
     private router: Router,
     private auth: AuthService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipeById(+params['id']);
        this.id = +params['id'];
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activeRoute});
  }

  onDeleteRecipe() {
    if (this.auth.isAuthenticated()) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['../']);
    } else {
      this.router.navigate(['/signIn']);
    }
  }
}
