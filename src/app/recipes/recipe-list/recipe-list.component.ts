import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipies();

    this.recipeSubscription = 
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  toNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activeRoute} );
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
