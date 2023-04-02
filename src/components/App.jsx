import { Component } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import SearchBar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class App extends Component {
  state = {
    photos: [],
    value: '',
    prevValue: '',
    isLoading: false,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  async componentDidUpdate(prevValue, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || page !== prevState.page) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({
      isLoading: true,
    });
    const { value, page } = this.state;
    const KEY = '33147490-9fc73efc70912b9906c0b3bde';
    const BASE = 'https://pixabay.com/api/';
    const FILTER = 'image_type=photo&orientation=horizontal&per_page=12';

    try {
      const response = await axios.get(
        `${BASE}?q=${value}&page=${page}&key=${KEY}&${FILTER}`
      );
      if (response.data.hits.length > 0) {
        this.setState(prevState => ({
          photos: [...prevState.photos, ...response.data.hits],
        }));
      } else if (response.data.hits.length === 0) {
        Notify.info('Sorry, there are no more matches.');
      } else {
        Notify.failure("Sorry, we couldn't find any matches.");
      }
    } catch (error) {
      this.setState({ error });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = query => {
    if (query !== this.state.prevValue) {
      this.setState({ value: query, photos: [], page: 1, prevQuery: query });
    }
  };

  onImgClick = image => {
    this.setState({ showModal: true, selectedImage: image });
  };

  closeHandler = () => {
    this.setState({ showModal: false, selectedImage: null });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { photos, isLoading, showModal, selectedImage } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem photos={photos} onClick={this.onImgClick} />
        </ImageGallery>
        {isLoading && <Loader />}
        {photos.length > 0 && !isLoading && (
          <Button onClick={this.loadMoreHandler} />
        )}
        {showModal && (
          <Modal image={selectedImage} onClose={this.closeHandler} />
        )}
      </div>
    );
  }
}

export default App;
