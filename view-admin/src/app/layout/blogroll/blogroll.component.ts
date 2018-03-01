import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BlogrollService } from './blogroll.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash';

export class Blogroll {
  id?: string;
  name: string;
  url: string;
  order: number;
  _editable?: boolean;
}

@Component({
  selector: 'app-blogroll',
  templateUrl: './blogroll.component.html',
  styleUrls: [
    '../../share/css/init.css',
    './blogroll.component.css'
  ],
  providers: [
    BlogrollService
  ]
})
export class BlogrollComponent implements OnInit {
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

  addBlogrollForm: FormGroup;
  _addBlogrollLoading = false;
  _editBlogrollLoading = false;
  _editNewData;

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
    this.getBlogroll();
  }

  constructor(
    private fb: FormBuilder,
    private _blogrollService: BlogrollService,
    private _message: NzMessageService,
    private _modalService: NzModalService
  ) {
  }

  ngOnInit() {
    this.getBlogroll();

    // 新增友链的表单校验
    this.addBlogrollForm = this.fb.group({
      linkName: [null, [Validators.required]],
      siteLink: [null, [
        Validators.required,
        Validators.pattern('^(http://|https://).+')
      ]],
      linkOrder: [0, [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$')
      ]]
    });
  }

  _editData(id) {
    _.forEach(this._dataSet, (data, index) => {
      data._editable = false;
    });
    this._editNewData = _.cloneDeep(_.assign(_.find(this._dataSet, { id: id }), { _editable: true }));
  }

  /* 修改 */
  saveEditData() {
    // 校验name
    if (this._editNewData.name.length === 0) {
      return this._message.create('error', '请填写链接名称', { nzDuration: 3000 });
    }
    // 校验url，url需以http或https协议开头
    if (!/^(http:\/\/|https:\/\/).+/.test(this._editNewData.url)) {
      return this._message.create('error', '请正确填写链接url，url应该包含协议', { nzDuration: 3000 });
    }
    // 校验order，order为自然数
    if (!/^(0|[1-9][0-9]*)$/.test(this._editNewData.order)) {
      return this._message.create('error', '排序应该是自然数', { nzDuration: 3000 });
    }
    this._editBlogrollLoading = true;
    this._blogrollService.editBlogroll(this._editNewData.id, this._editNewData.name, this._editNewData.url, this._editNewData.order)
      .subscribe(data => {
        this._editBlogrollLoading = false;
        if (data.status === 201) {
          this.refreshData();
          this._message.create('success', data.message);
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._editBlogrollLoading = false;
        this._message.create('error', '网络连接异常');
      });
  }

  _cancelEditData() {
    _.forEach(this._dataSet, (data, index) => {
      data._editable = false;
    });
    this._editNewData = {};
  }

  /* 获取 */
  getBlogroll() {
    this._blogrollService.getBlogroll()
      .subscribe(blogrolls => {
        this._dataSet = [];
        blogrolls.data.forEach((blogroll, index) => {
          const blogrollEle: Blogroll = {
            id: blogroll._id,
            name: blogroll.name,
            url: blogroll.url,
            order: blogroll.order,
            _editable: false
          };
          this._dataSet.push(blogrollEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
        this._message.create('error', '网络连接异常');
      });
  }

  /* 新增 */
  addBlogroll() {
    this._addBlogrollLoading = true;
    const newBlogroll = this.addBlogrollForm.value;
    this._blogrollService.addBlogroll(newBlogroll.linkName, newBlogroll.siteLink, newBlogroll.linkOrder)
      .subscribe(data => {
        this._addBlogrollLoading = false;
        const blogroll = data.data;
        if (data.status === 201) {
          this.refreshData();
          this._message.create('success', data.message);
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._addBlogrollLoading = false;
        this._message.create('error', '网络连接异常');
      });
  }

  /**
   * 弹出删除友链确认对话框
   * @param id
   * @param name 友链名称
   */
  removeBlogrollModal(id: string, name: string) {
    this._modalService.confirm({
      title: `是否要删除友链“${name}”`,
      content: '<b>删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk: () => {
        this.removeBlogroll(id);
      }
    });
  }

  /* 删除单条 */
  removeBlogroll(id: string) {
    this._blogrollService.removeBlogroll(id)
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

 /* 弹出删除多条友链确认对话框 */
  removeBlogrollsModal() {
    let ids: any = [];
    this._dataSet.forEach(value => {
      if (value.checked) {
        ids.push(value.id);
      }
      value.checked = false;
    });
    ids = JSON.stringify(ids);
    console.log(ids);
    this._modalService.confirm({
      title: `是否要删除${ids.length}个友链`,
      content: '<b>删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk: () => {
        this.removeBlogrolls(ids);
      }
    });
  }

  /* 删除多条 */
  removeBlogrolls(ids: string[]) {
    this._blogrollService.removeBlogrolls(ids)
      .subscribe(data => {
        if (data.status === 204) {
          this.refreshData();
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._addBlogrollLoading = false;
        this._message.create('error', '网络连接异常');
      });
  }
}
