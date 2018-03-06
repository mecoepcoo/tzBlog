import { Component, OnInit } from '@angular/core';
import { EditorConfig } from '../editor/editor-md-config';
import { Category } from '../models/category.model';
import { Tag } from '../models/tag.model';
import { CategoryService } from '../../share/category.service';
import { TagService } from '../../share/tag.service';

export class EditPost {
  id?: string;
  title: string;
  author: string;
  _category: string;
  content: string;
  reading: number | string;
  date: number | string;
  order: number | string;
  _tags: string;
}

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  conf = new EditorConfig();
  markdown = '';

  categories: Category[] = [{
    id: '',
    name: '请选择分类'
  }];
  tags: Tag[];
  editPost: EditPost = {
    id: '',
    title: '',
    author: '',
    content: '',
    reading: 0,
    date: 0,
    order: 0,
    _tags: '',
    _category: ''
  };

  constructor(
    private _categoryService: CategoryService,
    private _tagService: TagService,
  ) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllTags();
  }

  // 同步编辑器内容
  syncModel(str): void {
    this.markdown = str;
  }

  getAllCategories() {
    this._categoryService.getCategory()
      .subscribe(categories => {
        this.categories = [];
        categories.data.forEach((category, index) => {
          const categoryEle: Category = {
            id: category._id,
            name: category.name,
          };
          this.categories.push(categoryEle);
        });
      }, error => {
        console.error(error);
      });
  }

  getAllTags() {
    this._tagService.getTag()
      .subscribe(tags => {
        this.tags = [];
        tags.data.forEach((tag, index) => {
          const tagEle: Tag = {
            id: tag._id,
            name: tag.name,
          };
          this.tags.push(tagEle);
        });
      }, error => {
        console.error(error);
      });
  }

  t(event) {
    console.log(event);
  }

}
