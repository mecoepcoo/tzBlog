import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminGroupService } from '../../share/admin-group.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { AdminGroup } from '../models/admin-group.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: [
    '../../share/css/init.css',
    './admin-group.component.css'
  ],
  providers: [
    AdminGroupService
  ]
})
export class AdminGroupComponent implements OnInit {
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
  _isEditConfirmLoading = false;
  _isVisibleEdit = false;
  addItemForm: FormGroup;
  editItemForm: FormGroup;
  authList = [];
  editAuthList = [];
  addSelectedAuthList: any[] = [];
  editSelectedAuthList: any[] = [];

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
    this.getAdminGroup();
  }

  constructor(
    private _adminGroupService: AdminGroupService,
    private fb: FormBuilder,
    private _message: NzMessageService,
    private _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getAdminAuth();
    this.getAdminGroup();

    this.addItemForm = this.fb.group({
      groupName: [null, [Validators.required]],
    });
    this.editItemForm = this.fb.group({
      groupName: [null, [Validators.required]]
    });
  }

  selectAuth(ret: any) {
    // console.log('nzSelectChange', ret);
  }

  addSelectChange(ret: any) {
    // console.log('nzChange', ret);
    switch (ret.from) {
      case 'left':
        this.addSelectedAuthList = _.concat(this.addSelectedAuthList, ret.list);
        break;
      case 'right':
        this.addSelectedAuthList = _.difference(this.addSelectedAuthList, ret.list);
    }
  }

  getAdminAuth() {
    this._adminGroupService.getAdminAuth()
      .subscribe(auths => {
        const tempAuths = _.cloneDeep(auths.data);
        tempAuths.sort((a, b) => {
          return a.category.localeCompare(b.category);
        });
        this.authList = tempAuths;
      }, error => {
        console.error(error);
        this._message.create('error', '网络连接异常');
      });
  }

  /* 获取 */
  getAdminGroup() {
    this._adminGroupService.getAdminGroup()
      .subscribe(groups => {
        this._dataSet = [];
        groups.data.forEach((group, index) => {
          const groupEle: AdminGroup = {
            id: group._id,
            name: group.name,
            _auth: group._auth,
            _editable: false
          };
          this._dataSet.push(groupEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
        this._message.create('error', '网络连接异常');
      });
  }

  addAdminGroup() {
    this._addItemLoading = true;
    const newItem = this.addItemForm.value;
    const auth = [];
    this.addSelectedAuthList.forEach( (item, index) => {
      auth.push(item._id);
    });
    this._adminGroupService.addAdminGroup(newItem.groupName, auth)
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

  removeItemModal(id: string, name: string) {
    this._modalService.confirm({
      title: `是否要删除管理组“${name}”`,
      content: '<b>删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk: () => {
        this.removeItem(id);
      }
    });
  }

  removeItem(id: string) {
    this._adminGroupService.removeAdminGroup(id)
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

  _showEditModal(data) {
    this._isVisibleEdit = true;
    this._editNewData = data;
    this.editItemForm.setValue({
      groupName: data.name
    });
    this.editAuthList = _.cloneDeep(this.authList);
    this.editSelectedAuthList = [];
    let authIndex;
    data._auth.forEach((auth, index) => {
      authIndex = _.findIndex(this.editAuthList, {_id: auth._id});
      this.editAuthList[authIndex].direction = 'right';
      this.editSelectedAuthList.push(this.editAuthList[authIndex]);
    });
  }

  editSelectChange(ret: any) {
    // console.log('nzChange', ret);
    switch (ret.from) {
      case 'left':
        this.editSelectedAuthList = _.concat(this.editSelectedAuthList, ret.list);
        break;
      case 'right':
        this.editSelectedAuthList = _.difference(this.editSelectedAuthList, ret.list);
    }
  }

  _editHandleCancel(e) {
    this._isVisibleEdit = false;
  }

  _editHandleOk(e) {
    this._isEditConfirmLoading = true;
    this.saveEditData(this._editNewData.id);
  }

  /* 修改 */
  saveEditData(id) {
    this._editItemLoading = true;
    const newItem = this.editItemForm.value;
    this._adminGroupService.editAdminGroup(id, newItem.groupName, this.editSelectedAuthList)
      .subscribe(data => {
        this._isVisibleEdit = false;
        this._isEditConfirmLoading = false;
        if (data.status === 201) {
          this.refreshData();
          this._message.create('success', data.message);
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._isEditConfirmLoading = false;
        this._message.create('error', '网络连接异常');
      });
  }

}
