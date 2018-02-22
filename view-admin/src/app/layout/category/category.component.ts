import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../share/category.service';

export class Category {
  id: String;
  name: String;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _operating = false;
  _dataSet = [];
  _indeterminate = false;
  _loading = true;

  _total = 1;
  _current = 1;
  _pageSize = 10;

  _refreshStatus() {
    const allChecked = this._dataSet.every(value => value.checked === true);
    const allUnChecked = this._dataSet.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._dataSet.forEach(data => data.checked = true);
    } else {
      this._dataSet.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  constructor(
    private _categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this._categoryService.getCategory()
      .subscribe(categories => {
        this._dataSet = [];
        categories.data.forEach((category, index) => {
          const categoryEle: Category = {
            id: category._id,
            name: category.name,
          };
          this._dataSet.push(categoryEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }
}
