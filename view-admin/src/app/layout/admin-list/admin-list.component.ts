import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { AdminListService } from './admin-list.service';
import { AdminGroupService } from '../../share/admin-group.service';
import { AdminGroup } from '../models/admin-group.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [
    AdminListService,
    AdminGroupService
  ]
})
export class AdminListComponent implements OnInit {
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

  adminGroup: AdminGroup;
  _addNewData = {
    name: '',
    password: '',
    group: ''
  };
  _editNewData;
  _addItemLoading = false;
  _editItemLoading = false;

  _pageSizeChange($event) {
    this._pageSize = $event;
    this.refreshData(true);
  }

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
    this.getAdminList(this._current, this._pageSize);
  }

  constructor(
    private _adminListService: AdminListService,
    private _adminGroupService: AdminGroupService,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.getAdminList(this._current, this._pageSize);
    this.getAdminGroup();
  }

  getAdminList(page, size) {
    this._adminListService.getAdminList(page, size)
      .subscribe(admins => {
        this._total = admins.total;
        this._dataSet = [];
        admins.data.forEach((admin, index) => {
          this._dataSet.push({
            name: admin.name,
            group: admin._group,
            createDate: admin.createDate,
            isBan: admin.isBan
          });
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }

  getAdminGroup() {
    this._adminGroupService.getAdminGroup()
      .subscribe(group => {
        this.adminGroup = group.data;
        this._addNewData.group = group.data[0]._id;
      }, error => {
        console.error(error);
        this._message.create('error', '网络连接异常');
      });
  }

  /* 新增 */
  addAdminUser() {
    this._addItemLoading = true;
    this._adminListService.addAdminUser(this._addNewData.name, this._addNewData.password, this._addNewData.group)
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

}
