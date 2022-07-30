import { Serchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleyItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImage } from '../FetchApi';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { useEffect, useState, useRef } from 'react';

export const App = () => {
  const [searchImg, setSearchImg] = useState('');
  const [imageList, setImageList] = useState([]);
  const [totalImg, setTotalImg] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const firstRender = useRef(true);
  useEffect(() => {
    if (!firstRender.current) {
      setShowLoad(true);
      fetchImage(searchImg, page, perPage)
        .then(res => {
          setImageList([...imageList, ...res.hits]);
          setTotalImg(res.totalHits);
          setStatus(res.hits.length ? 'resolved' : 'rejected');
        })
        .finally(() => setShowLoad(false));
    }
  }, [page, searchImg, perPage]);

  const handlePerPage = perPage => {
    setPerPage(perPage);
    setPage(1);
    setImageList([]);
  };

  const handleSubmit = input => {
    firstRender.current = false;
    if (input !== searchImg) {
      setImageList([]);
      setPage(1);
      setSearchImg(input);
    }
  };

  const handleMoreImg = () => {
    setPage(page + 1);
  };

  const handleToglModal = () => {
    setShowModal(prev => !prev);
  };

  const handleClick = e => {
    if (e.target.dataset.source) {
      setModalImg(e.target.dataset.source);
      handleToglModal();
    }
    if (e.target.dataset.overlay) {
      handleToglModal();
    }
  };

  return (
    <div className="app" onClick={handleClick}>
      <Serchbar
        onSubmit={handleSubmit}
        onChangePerPage={handlePerPage}
        status={status}
      />
      {status === 'idle' && <h2 className="message">Enter the query</h2>}
      {status === 'rejected' && (
        <h2 className="message">Nothing found for your query: {searchImg}</h2>
      )}

      {status === 'resolved' && (
        <ImageGallery>
          {imageList.map(img => {
            return <ImageGalleyItem key={img.id} imageList={img} />;
          })}
        </ImageGallery>
      )}
      {!showLoad && imageList.length < totalImg && (
        <Button onClick={handleMoreImg} />
      )}
      {showLoad && <Loader />}
      {showModal && <Modal imgUrl={modalImg} onClose={handleToglModal} />}
    </div>
  );
};
