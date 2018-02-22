import { Component, OnInit } from '@angular/core';
import { TagService } from '../../share/tag.service';

export class Tag {
  id: String;
  name: String;
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
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
    private _tagService: TagService
  ) {
  }

  ngOnInit() {
    this.getTag();
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
}
