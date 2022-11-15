import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from 'Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './LoadMore/LoadMore';
import { LoadSpinner } from './LoadSpinner/LoadSpinner';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    scrollOnLoadButton();
    setIsLoading(true);
    fetchImages(query, page)
      .then(data => {
        setImages(prevImages =>
          page === 1 ? [...data.hits] : [...prevImages, ...data.hits]
        );
        setTotalHits(prevHits =>
          page === 1
            ? data.totalHits - data.hits.length
            : data.totalHits - [...prevHits, ...data.hits].length
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);
  const toggleModal = modalImage => {
    switch (!modalImage) {
      case modalImage:
        setModalImage('');
        break;
      case showModal:
        setShowModal(false);
        break;
      default:
        setModalImage(modalImage);
        setShowModal(true);
    }
  };
  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };
  // check
  const handleLoadMoreImg = () => {
    setPage(prevPage => prevPage + 1);
  };

  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={toggleModal} />
      {showModal && <Modal closeModal={toggleModal} modalImage={modalImage} />}

      {!!totalHits && !isLoading && <LoadMore onLoadMore={handleLoadMoreImg} />}
      {isLoading && <LoadSpinner />}
    </>
  );
};
// export class App extends React.Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     modalImage: '',
//     showModal: false,
//     totalHits: 0,
//     total: 0,
//   };
//   componentDidUpdate = (_, prevState) => {
//     const { query, page } = this.state;
//     if (page !== 1) {
//       this.scrollOnLoadButton();
//     }
//     if (query !== prevState.query || page !== prevState.page) {
// this.setState({ isLoading: true });
//       fetchImages(query, page)
//         .then(data => {
//           this.setState(prevState => ({
//             images:
//               page === 1 ? [...data.hits] : [...prevState.images, ...data.hits],
//             totalHits:
//               page === 1
//                 ? data.totalHits - data.hits.length
//                 : data.totalHits - [...prevState.images, ...data.hits].length,
//           }));
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   };
//   // Открытие/закрытие модалки
//   toggleModal = modalImage => {
//     if (!modalImage) {
//       this.setState({ modalImage: '', showModal: false });
//       return;
//     }
//     this.setState({ modalImage, showModal: true });
//   };
//   // Сабмит формы
//   handleSubmit = query => {
//     this.setState({ query, page: 1 });
//   };
//   // Загрузить больше
//   handleLoadMoreImg = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };
//   //Скрол по нажатию на кнопку
//   scrollOnLoadButton = () => {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { images, showModal, isLoading, modalImage, totalHits } = this.state;
//     const { handleSubmit, toggleModal, handleLoadMoreImg } = this;

//     return (
//       <>
//         <SearchBar onSubmit={handleSubmit} />
//         <ImageGallery images={images} openModal={toggleModal} />
//         {showModal && (
//           <Modal closeModal={toggleModal} modalImage={modalImage} />
//         )}

//         {!!totalHits && !isLoading && (
//           <LoadMore onLoadMore={handleLoadMoreImg} />
//         )}
//         {isLoading && <LoadSpinner />}
//       </>
//     );
//   }
// }
