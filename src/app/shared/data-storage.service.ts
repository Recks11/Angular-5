import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class DataStorageService {

  private apiUrl = 'https://ng-recipe-book-1963f.firebaseio.com/recipe.json';
  private jsonHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private recipeService: RecipeService, private auth: AuthService) { }

  saveData(recipeData: Recipe[]) {
    const token = this.auth.getIdToken();
    return this.http.put<Recipe[]>(this.apiUrl, recipeData,
      {
        headers: this.jsonHeaders,
        params: new HttpParams().set('auth', token)
      }
    );
  }

  fetchData() {
    const token = this.auth.getIdToken();
    this.http.get<Recipe[]>(this.apiUrl, { headers: this.jsonHeaders, params: new HttpParams().set('auth', token) })
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
