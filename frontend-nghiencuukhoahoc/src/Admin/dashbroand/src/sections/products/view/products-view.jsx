import { useState, useEffect, createContext } from 'react';
import "./products-view.css"
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// import { products } from '../../../_mock/products';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';
import ModalCreateProducts from './modal/ModalCreateProducts';
import ModalSizeProducts from './modal/ModalSizeProducts';
import ModalLoaiProducts from './modal/ModalLoaiProducts';
import ModalHangProducts from './modal/ModalHangProducts';
import eventBus from './modal/EventBus';
import React from "react";

// ----------------------------------------------------------------------

const ThemeContext = createContext();

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const tokenSetStorage = sessionStorage.getItem("accessToken");

  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });
  const [DataBooks, setDataBooks] = useState([]);
  const [DataShoeBrands, setDataShoeBrands] = useState({ hang: [], loading: true, error: null });
  const [callbackTriggered, setCallbackTriggered] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {


    fetchData();
  }, []);

  const [dataUpdated, setDataUpdated] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axiosWithCredentials.get("http://localhost:3003/admin/v1/product/all/watch");
      setDataBooks(response.data);
      console.log('check', DataBooks)

      // console.log("check data callback products", response.data);
    } catch (error) {
      console.error(error.message);
      setDataBooks({
        data: [],
        loading: false,
        error: error.message,
      });
    }
  };

  useEffect(() => {
    if (callbackTriggered) {
      fetchData();
      setCallbackTriggered(false); // Reset callbackTriggered
    }
  }, [callbackTriggered]);

  const handleCallback = () => {
    console.log("Callback function is executed");
    setCallbackTriggered(true);
  };
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  console.log(DataBooks)
  return (
    <>  <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>






      <div className='container-modalCreate'>
        <ModalCreateProducts
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          callback={handleCallback}

        />


        <div className='ml-4'>  <ModalLoaiProducts
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        /></div>


        <ModalSizeProducts
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
        <div className='margin10px'>
          <ModalHangProducts
            modalIsOpen={modalIsOpen}
            openModal={openModal}
            closeModal={closeModal}
          /></div>

      </div>



      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >

        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            DataShoeSort={DataBooks}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {DataBooks.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product}
              callback={handleCallback} />
          </Grid>
        ))}
      </Grid>


      <ProductCartWidget />
    </Container></>

  );
}
