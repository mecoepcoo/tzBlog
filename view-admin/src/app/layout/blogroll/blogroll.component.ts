import { Component, OnInit } from '@angular/core';
import { BlogrollService } from './blogroll.service';

export class Blogroll {
  id: String;
  name: String;
  url: String;
}

@Component({
  selector: 'app-blogroll',
  templateUrl: './blogroll.component.html',
  styleUrls: ['./blogroll.component.css'],
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
    private _blogrollService: BlogrollService
  ) {
  }

  ngOnInit() {
    this.getBlogroll();
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
          };
          this._dataSet.push(blogrollEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }

}
