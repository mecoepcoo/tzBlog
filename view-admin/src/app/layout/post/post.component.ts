import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { PostService } from '../../share/post.service';
import { Post } from '../models/post.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: [
    '../../share/css/init.css',
    './post.component.css'
  ]
})
export class PostComponent implements OnInit {
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

  refreshData(reset = false) {
    if (reset) {
      this._current = 1;
    }
    this._loading = true;
    this.getPosts(this._current, this._pageSize);
  }

  constructor(
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private _postService: PostService
  ) {
  }

  ngOnInit() {
    this.getPosts(this._current, this._pageSize);
  }

  getPosts(page, size) {
    this._postService.getPosts(page, size)
      .subscribe(posts => {
        this._total = posts.total;
        this._dataSet = [];
        posts.data.forEach((post, index) => {
          const tagsTemp = [];
          post._tags.forEach(tag => {
            tagsTemp.push({
              id: tag._id,
              tag: tag.name
            });
          });
          const postEle: Post = {
            id: post._id,
            title: post.title,
            author: post.author,
            _category: {
              id: post._category._id,
              category: post._category.name
            },
            content: post.content,
            reading: post.reading,
            date: post.date,
            order: post.order,
            _tags: tagsTemp
          };
          this._dataSet.push(postEle);
        });
        this._loading = false;
      }, error => {
        console.error(error);
      });
  }

  removeItemModal(id: string, title: string) {
    this._modalService.confirm({
      title: `是否要删除文章“${title}”`,
      content: '<b>删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk: () => {
        this.removeItem(id);
      }
    });
  }

  /* 删除单条 */
  removeItem(id: string) {
    this._postService.removePost(id)
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
