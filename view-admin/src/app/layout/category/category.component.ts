import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CategoryService } from '../../share/category.service';
import * as _ from 'lodash';

export class Category {
  id?: String;
  name: String;
  _editable?: boolean;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: [
    '../../share/css/init.css',
    './category.component.css'
  ]
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

  _editNewData;
  _addItemLoading = false;
  _editItemLoading = false;
  addItemForm: FormGroup;

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
    setTimeout(() => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    this.getCategory();
  }

  constructor(
    private _categoryService: CategoryService,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.getCategory();

    this.addItemForm = this.fb.group({
      name: [null, [Validators.required]],
    });
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

  _editData(id) {
    _.forEach(this._dataSet, (data, index) => {
      data._editable = false;
    });
    this._editNewData = _.cloneDeep(_.assign(_.find(this._dataSet, { id: id }), { _editable: true }));
  }

  _cancelEditData() {
    _.forEach(this._dataSet, (data, index) => {
      data._editable = false;
    });
    this._editNewData = {};
  }

  /* 新增 */
  addCategory() {
    this._addItemLoading = true;
    const newItem = this.addItemForm.value;
    this._categoryService.addCategory(newItem.name)
      .subscribe(data => {
        this._addItemLoading = false;
        if (data.status === 201) {
          this.refreshData();
          this._message.create('success', data.message);
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._addItemLoading = false;
        this._message.create('error', '网络连接异常');
      });
  }

  /* 修改 */
  saveEditData() {
    // 校验name
    if (this._editNewData.name.length === 0) {
      return this._message.create('error', '请填写分类名称', { nzDuration: 3000 });
    }
    this._editItemLoading = true;
    this._categoryService.editCategory(this._editNewData.id, this._editNewData.name)
      .subscribe(data => {
        this._editItemLoading = false;
        if (data.status === 201) {
          this.refreshData();
          this._message.create('success', data.message);
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._editItemLoading = false;
        this._message.create('error', '网络连接异常');
      });
  }

  removeItemModal(id: string, name: string) {
    this._modalService.confirm({
      title: `是否要删除分类“${name}”`,
      content: '<b>删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk: () => {
        this.removeItem(id);
      }
    });
  }

  /* 删除单条 */
  removeItem(id: string) {
    this._categoryService.removeCategory(id)
      .subscribe(data => {
        if (data.status === 204) {
          this.refreshData();
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._message.create('error', '网络连接异常');
      });
  }
}
