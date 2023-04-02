import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return this.props.photos.map(el => (
      <li className="gallery-item" key={el.id}>
        <img
          className="imageGalleryItem"
          src={el.webformatURL}
          alt={el.tags}
          onClick={() => this.props.onClick(el.largeImageURL)}
        />
      </li>
    ));
  }
}

export default ImageGalleryItem;
