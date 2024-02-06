// Searchbar.jsx
import React, { Component } from 'react';
import PixabayApi from './PixabayApi';
import ImageGallery from './ImageGallery';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };

    this.pixabayApi = new PixabayApi();
  }

  handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value;
    if (!searchQuery) {
      return;
    }

    try {
      const response = await this.pixabayApi.getImages(searchQuery, this.pixabayApi.queryPage);
      const newImages = response.hits.map((hit) => ({
        id: hit.id,
        imageUrl: hit.webformatURL,
        alt: hit.tags,
      }));

      this.setState({ images: newImages });
      this.pixabayApi.incrementPage();
      this.props.setSearchedImages(newImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  handleLoadMore = async () => {
    try {
      const moreImages = await this.pixabayApi.getMoreImages(this.state.searchQuery);
      this.setState((prevState) => ({
        images: [...prevState.images, ...moreImages],
      }));
    } catch (error) {
      console.error('Error fetching more images:', error);
    }
  };

  render() {
    return (
      <section>
        <div className="search-box">
          <span className="logo-name" onClick={() => window.location.reload()}>
            Image Seeker
          </span>
          <form className="search-form" id="search-form" onSubmit={this.handleSearch}>
            <input
              type="text"
              name="searchQuery"
              autoComplete="off"
              placeholder="Search images..."
            />
            <button className="search-form-button" type="submit">
              &#128269;
            </button>
          </form>
        </div>
        <ImageGallery images={this.state.images} loadMore={this.handleLoadMore} />
      </section>
    );
  }
}

export default Searchbar;
