import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorConfig } from '../editor/editor-md-config';
import { Category } from '../models/category.model';
import { Tag } from '../models/tag.model';
import { CategoryService } from '../../share/category.service';
import { PostService } from '../../share/post.service';
import { TagService } from '../../share/tag.service';

export class EditPost {
  id?: string;
  title: string;
  author: string;
  _category: string;
  content: string;
  reading: number | string;
  date: number | string | Date;
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

  _submitLoading = false;
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
    date: new Date().getTime(),
    order: 0,
    _tags: '',
    _category: ''
  };

  constructor(
    private _categoryService: CategoryService,
    private _tagService: TagService,
    private _postService: PostService,
    private _message: NzMessageService,
    private _modalService: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllTags();
    this.activatedRoute.params.
      subscribe(param => {
        if (param.id) {
          this.getPost(param.id);
        }
      });
  }

  // 同步编辑器内容
  syncModel(str): void {
    this.editPost.content = str;
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
        if (!this.editPost._category) {
          this.editPost._category = this.categories[0].id;
        }
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

  submitPost() {
    if (this.editPost.id) {
      this.updatePost();
    } else {
      this.addPost();
    }
  }

  getPost(id) {
    this._postService.getPost(id)
      .subscribe(data => {
        const post = data.data;
        this.editPost.id = post._id;
        this.editPost.title = post.title;
        this.editPost.author = post.author;
        this.editPost.content = post.content;
        this.editPost.reading = post.reading;
        this.editPost.date = post.date;
        this.editPost.order = post.order;
        this.editPost._tags = post._tags;
        this.editPost._category = post._category;
      });
  }

  addPost() {
    const newPost = {
      title: this.editPost.title,
      author: this.editPost.author,
      categoryId: this.editPost._category,
      tagIds: JSON.stringify(this.editPost._tags),
      order: this.editPost.order,
      date: new Date(<any>this.editPost.date).getTime(),
      content: this.editPost.content
    };
    this._postService.addPost(newPost)
      .subscribe(data => {
        this._submitLoading = false;
        if (data.status === 201) {
          this._message.create('success', data.message);
          this.router.navigateByUrl('admin/post');
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._submitLoading = false;
        this._message.create('error', '发布失败');
      });
  }

  updatePost() {
    const id = this.editPost.id;
    const newPost = {
      title: this.editPost.title,
      author: this.editPost.author,
      categoryId: this.editPost._category,
      tagIds: JSON.stringify(this.editPost._tags),
      order: this.editPost.order,
      date: new Date(<any>this.editPost.date).getTime(),
      content: this.editPost.content
    };
    this._postService.editPost(id, newPost)
      .subscribe(data => {
        this._submitLoading = false;
        if (data.status === 201) {
          this._message.create('success', data.message);
          this.router.navigateByUrl(`admin/post`);
        } else {
          this._message.create('error', data.message, { nzDuration: 3000 });
        }
      }, err => {
        this._submitLoading = false;
        this._message.create('error', '发布失败');
      });
  }

}
