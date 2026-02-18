export class Document {
  public id: string;
  public name: string;
  public url: string;
  public children?: any[] | null;

  constructor(id: string, name: string, url: string, children?: any[] | null) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.children = children || null;
  }
}
