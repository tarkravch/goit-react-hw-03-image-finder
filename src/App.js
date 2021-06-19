import React, { Component } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import imagesApi from "./images-api";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal";
import "./App.scss";

class App extends Component {
  static defaultProps = {};

  static propTypes = {
    //
  };

  state = {
    hits: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    showModal: false,
    error: null,
    selectedImage: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  choseModalPic = (event) => {
    const largePicture = event.currentTarget.srcset;
    console.log(largePicture);
    this.setState({ selectedImage: largePicture });
    console.log(this.state.selectedImage);
    this.toggleModal();
  };

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then((hits) => {
        console.log(hits);
        this.setState((prevState) => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { error, hits, isLoading, showModal, selectedImage } = this.state;
    return (
      <div className="App">
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
        {error && <h1>Ой ошибка, всё пропало!!!</h1>}
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery images={hits} openModal={this.choseModalPic} />
        {isLoading && (
          <div className="Loader">
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}

        {hits.length > 0 && !isLoading && (
          <Button loadMore={this.fetchImages} />
        )}
      </div>
    );
  }
}

export default App;
