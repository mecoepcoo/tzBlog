import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogrollService } from './blogroll.service';
import { NzMessageService } from 'ng-zorro-antd';

export class Blogroll {
  id?: string;
  name: string;
  url: string;
  order: number;
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
    this.getBlogroll();
  }

  constructor(
    private fb: FormBuilder,
    private _blogrollService: BlogrollService,
    private _message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.getBlogroll();

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

  getBlogroll() {
    this._blogrollService.getBlogroll()
      .subscribe(blogrolls => {
        this._dataSet = [];
        blogrolls.data.forEach((blogroll, index) => {
          const blogrollEle: Blogroll = {
            id: blogroll._id,
            name: blogroll.name,
            url: blogroll.url,
            order: blogroll.order
          };
          this._dataSet.push(blogrollEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }

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

}
