import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service';

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStore: DataStorageService,
              private recipeService: RecipeService,
              private auth: AuthService) { }
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  storeRecipes() {
    this.dataStore.saveData(this.recipeService.getRecipies()).subscribe();
  }

  getRecipes() {
    this.dataStore.fetchData();
  }

  logOut() {
    this.auth.signOutUser();
  }
}
