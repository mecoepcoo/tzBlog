import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../share/statistic.service';

@Component({
  selector: 'app-blog-footer',
  templateUrl: './blog-footer.component.html',
  styleUrls: ['../../public/css/header.css'],
  providers: [
    StatisticService
  ]
})
export class BlogFooterComponent implements OnInit {
  statistic = {
    uv: 0,
    pv: 0
  };
  constructor(
    private _statisticService: StatisticService
  ) { }

  ngOnInit() {
    this.getStatistic();
  }

  getStatistic() {
    return this._statisticService.getStatistic()
      .subscribe(datas => {
        this.statistic = datas.data;
      }, error => {
        console.error('统计数据载入失败');
      });
  }

}
