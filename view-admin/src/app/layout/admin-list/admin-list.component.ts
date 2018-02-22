import { Component, OnInit } from '@angular/core';

import { AdminListService } from './admin-list.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [
    AdminListService
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
    setTimeout(_ => {
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
    private _adminListService: AdminListService
  ) {
  }

  ngOnInit() {
    this.getAdminList(this._current, this._pageSize);
  }

  getAdminList(page, size) {
    this._adminListService.getAdminList(page, size)
      .subscribe(admins => {
        this._total = admins.total;
        this._dataSet = [];
        admins.data.forEach((admin, index) => {
          this._dataSet.push({
            name: admin.name,
            groupName: admin.groupName,
            groupId: admin.groupId
          });
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }

}
