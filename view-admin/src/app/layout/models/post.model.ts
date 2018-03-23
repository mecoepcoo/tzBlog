export class Post {
  id?: string;
  title: string;
  author: string;
  _category: {
    id: string;
    category: string;
  };
  content: string;
  reading: number;
  date: number;
  order: number;
  _tags: any;
  _editable?: boolean;
}
