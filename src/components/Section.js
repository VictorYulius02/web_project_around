class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach((item) => {this.addItem(item);
    });
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}

export default Section;