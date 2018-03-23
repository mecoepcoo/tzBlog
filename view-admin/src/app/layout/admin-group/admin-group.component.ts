import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminGroupService } from './admin-group.service';
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
    this.getAdminGroup();
  }

  constructor(
    private _adminGroupService: AdminGroupService,
    private fb: FormBuilder,
    private _message: NzMessageService,
    private _modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getAdminGroup();

    this.addItemForm = this.fb.group({
      groupName: [null, [Validators.required]],
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

  }

}
