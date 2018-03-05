import { Component, OnInit } from '@angular/core';
import { EditorConfig } from '../editor/editor-md-config';

export class EditPost {
  id?: string;
  title: string;
  author: string;
  _category?: {
    id: string;
    category: string;
  };
  content: string;
  reading: number;
  date: number;
  order: number;
  _tags?: any;
}

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  conf = new EditorConfig();
  markdown = '';

  editPost: EditPost = {
    id: '',
    title: '',
    author: '',
    content: '',
    reading: 0,
    date: 0,
    order: 0
  };

  constructor() { }

  ngOnInit() {
  }

  // 同步编辑器内容
  syncModel(str): void {
    this.markdown = str;
  }

  t(event) {
    console.log(event);
  }

}
