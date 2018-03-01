import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CategoryService } from '../../share/category.service';
import { TagService } from '../../share/tag.service';
import * as _ from 'lodash';

export class Tag {
  id?: String;
  name: String;
  _editable?: boolean;
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: [
    '../../share/css/init.css',
    './tag.component.css'
  ]
})
export class TagComponent implements OnInit {
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

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    this.getTag();
  }

  constructor(
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private fb: FormBuilder,
    private _tagService: TagService
  ) {
  }

  ngOnInit() {
    this.getTag();

    this.addItemForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  getTag() {
    this._tagService.getTag()
      .subscribe(tags => {
        this._dataSet = [];
        tags.data.forEach((tag, index) => {
          const tagEle: Tag = {
            id: tag._id,
            name: tag.name,
          };
          this._dataSet.push(tagEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }

  /* 新增 */
  addTag() {
    this._addItemLoading = true;
    const newItem = this.addItemForm.value;
    this._tagService.addTag(newItem.name)
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

  /* 修改 */
  saveEditData() {
    // 校验name
    if (this._editNewData.name.length === 0) {
      return this._message.create('error', '请填写标签名称', { nzDuration: 3000 });
    }
    this._editItemLoading = true;
    this._tagService.editTag(this._editNewData.id, this._editNewData.name)
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
      title: `是否要删除标签“${name}”`,
      content: '<b>删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk: () => {
        this.removeItem(id);
      }
    });
  }

  /* 删除单条 */
  removeItem(id: string) {
    this._tagService.removeTag(id)
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
