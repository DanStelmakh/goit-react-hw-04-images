import React from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from 'Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { LoadMore } from './LoadMore/LoadMore';
import { LoadSpinner } from './LoadSpinner/LoadSpinner';
import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    if (page !== 1) {
      scroll.scrollToBottom();
    }
    setIsLoading(true);
    fetchImages(query, page)
      .then(data => {
        setImages(prevImages =>
          page === 1 ? [...data.hits] : [...prevImages, ...data.hits]
        );
        setTotalHits(prevHits =>
          page === 1
            ? prevHits - data.hits.length
            : prevHits - [...data.hits].length
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, query]);
  // Открытие/закрытие модалки
  const toggleModal = modalImage => {
    if (!modalImage) {
      setModalImage('');
      setShowModal(false);

      return;
    }
    setModalImage(modalImage);
    setShowModal(true);
  };
  // Отправка формы
  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };
  //Загрузить больше
  const handleLoadMoreImg = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {!query && <span className="InfoTxt">Enter smth to search</span>}
      <ImageGallery images={images} openModal={toggleModal} />
      {showModal && <Modal closeModal={toggleModal} modalImage={modalImage} />}

      {!!totalHits && !isLoading && <LoadMore onLoadMore={handleLoadMoreImg} />}
      {isLoading && <LoadSpinner />}
    </>
  );
};
