import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TagService } from '../../share/tag.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: [
    './tags.component.css'
  ],
  providers: [
    TagService
  ]
})
export class TagsComponent implements OnInit, AfterViewInit {

  tagCloud: any[] = [
    {
      id: '',
      name: '',
      fontSize: '16px',
      color: '#000'
    }
  ];

  tagCloudCount = 0;

  constructor(
    private _tagService: TagService,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.setTitle('Tianzhen呀-标签');
    this.getTagCloud();
  }

  ngAfterViewInit() {

  }

  getTagCloud() {
    this._tagService.getTags()
      .subscribe(datas => {
        this.tagCloud = [];
        datas.data.forEach((data, index) => {
          const h = Math.random() * 360;
          const s = Math.random() * 100;
          const l = Math.random() * 70 + 30;
          const tagCloudEle = {
            id: data._id,
            name: data.tag,
            fontSize: Math.floor(Math.random() * 34 + 12) + 'px',
            color: `hsl(${h}, ${s}%, ${l}%)`
          };
          this.tagCloud.push(tagCloudEle);
        });
        this.tagCloudCount = datas.data.length;
      });
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
