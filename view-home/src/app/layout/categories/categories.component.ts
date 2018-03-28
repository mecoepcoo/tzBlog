import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../share/category.service';
import { PostService } from '../../share/post.service';
import { parseTime } from '../../share/timeToDate.fn';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: [
    './categories.component.css'
  ],
  providers: [
    CategoryService,
    PostService,
  ]
})
export class CategoriesComponent implements OnInit {

  constructor(
    private _categoryService: CategoryService,
    private _postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  categories: any = [
    {
      id: '',
      name: 'loading..',
      count: 0
    }
  ];

  categoriesCount = 0;

  currentCategory = {
    id: '',
    name: ''
  };

  currentPosts: any = [
    {
      id: '',
      title: '暂无文章',
      date: 'Jan 1, 1970'
    }
  ];

  pageConfig = {
    totalNum: 0,
    currentPage: 1,
    totalPage: 0,
    pageSize: 10
  };

  ngOnInit() {
    this.setTitle('Tianzhen呀-分类');
    this._categoryService.getCategories()
      .subscribe(datas => {
        this.categories = [];
        datas.data.forEach( (data, index) => {
          const dataEle = {
            id: data._id,
            name: data.category,
            count: data.count
          };
          this.categories.push(dataEle);
        });
        this.categoriesCount = this.categories.length;
        this.currentCategory = {
          id: this.categories[0].id,
          name: this.categories[0].name
        };
        this.getCategoryPosts(this.currentCategory.id, this.pageConfig.currentPage, this.pageConfig.pageSize);
        this.activatedRoute.queryParams
          .subscribe((param) => {
            if (param.id) {
              this.setCurrentCategory(param.id, param.cname);
            }
          });
      });
  }

  setCurrentCategory(id, name) {
    this.currentCategory.id = id;
    this.currentCategory.name = name;
    this.getCategoryPosts(this.currentCategory.id, 1, this.pageConfig.pageSize);
  }

  getPageData(currentPage) {
    this.getCategoryPosts(this.currentCategory.id, currentPage, this.pageConfig.pageSize);
  }

  getCategoryPosts(currentCategoryId, currentPage, pageSize) {
    this._postService.getPosts(currentPage, pageSize, currentCategoryId)
      .subscribe(datas => {
        this.pageConfig.totalNum = datas.total;
        this.pageConfig.totalPage = Math.ceil(this.pageConfig.totalNum / this.pageConfig.pageSize);
        this.currentPosts = [];
        if (datas.data.length) {
          this.currentPosts = [];
          datas.data.forEach((post, index) => {
            const postEle = {
              id: post._id,
              title: post.title,
              date: parseTime(post.date, 2)
            };
            this.currentPosts.push(postEle);
          });
        } else {
          this.currentPosts = [
            {
              id: '',
              title: '暂无文章',
              date: 'Jan 1, 1970'
            }
          ];
        }
      });
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
