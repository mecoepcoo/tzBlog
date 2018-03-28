import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Config } from '../../share/config';

@Component({
  selector: 'app-my-page',
  templateUrl: './page.component.html',
  styleUrls: [
    './page.component.css'
  ]
})
export class PageComponent implements OnInit {
  @Input('pageConfig') pageConfig;
  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();

  pageList = [1, 2, 3, 4, 5];
  totalPage: number;

  constructor() { }

  ngOnInit() {

  }

  getPageList(pageConfig) {
    let pageList = [];
    if (pageConfig.totalPage <= 5) {
      for (let i = 0; i < pageConfig.totalPage; i++) {
        pageList.push({
          pageNum: i + 1
        });
      }
    } else if (pageConfig.totalPage - pageConfig.currentPage < 5 && pageConfig.currentPage > 4) {
      pageList = [
        {
          pageNum: pageConfig.currentPage - 4
        },
        {
          pageNum: pageConfig.currentPage - 3
        },
        {
          pageNum: pageConfig.currentPage - 2
        },
        {
          pageNum: pageConfig.currentPage - 1
        },
        {
          pageNum: pageConfig.currentPage
        }
      ];
    } else {
      const currentNum = Math.floor((pageConfig.currentPage - 1) / 5) * 5 + 1;
      pageList = [
        {
          pageNum: currentNum
        },
        {
          pageNum: currentNum + 1
        },
        {
          pageNum: currentNum + 2
        },
        {
          pageNum: currentNum + 3
        },
        {
          pageNum: currentNum + 4
        }
      ];
    }
    return pageList;
  }

  turnPage(pageNum) {
    this.pageConfig.currentPage = pageNum;
    this.changePage.emit(this.pageConfig.currentPage);
  }

  skipPage(pageNum) {
    let num = parseInt(pageNum.value, 10);
    if (num < 1) {
      num = 1;
    } else if (num > this.pageConfig.totalPage) {
      num = this.pageConfig.totalPage;
    }
    this.turnPage(num);
  }

}
