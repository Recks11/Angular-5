import { Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
@ViewChild('shopForm') shoppingListForm: NgForm;
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.selectedForEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          'name': this.editedItem.name,
          amount : this.editedItem.amount
        });
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode === true) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredients(newIngredient);
    }
    this.resetForm();
  }

  onDelete() {

    this.shoppingListService.removeIngredient(this.editedItemIndex);
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  public ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
