export class EditorConfig {
  public width = '100%';
  public height = '400';
  public path = 'assets/editormd/lib/';
  public codeFold: true;
  public searchReplace = true;
  public toolbar = true;
  public emoji = false;
  public taskList = true;
  public tex = true;
  public readOnly = false;
  public tocm = true;
  public watch = true;
  public previewCodeHighlight = true;
  public placeholder = 'PI PI XIA LET\'S GO!';
  public saveHTMLToTextarea = true;
  public markdown = '';
  public flowChart = true;
  public syncScrolling = true;
  public sequenceDiagram = true;
  public imageUpload = true;
  public imageFormats = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'];
  public imageUploadURL = '';
  public toolbarIcons() {
  // Using '||' set icons align right.
    return [
      'undo', 'redo', '|',
      'bold', 'del', 'italic', 'quote', 'ucwords', 'uppercase', 'lowercase', '|',
      'list-ul', 'list-ol', 'hr', '|',
      'link', 'reference-link', 'image', 'code', 'preformatted-text', 'code-block', 'table', 'datetime', 'html-entities', '|', 'watch', 'preview', 'fullscreen', 'search', '|',
      'help', 'info'
    ];
  }

  constructor() {
  }
}
