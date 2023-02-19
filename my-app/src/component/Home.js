import React, { useEffect } from "react";
import ItemCardAll from "./ItemList";
import { useDispatch } from 'react-redux';
import {
  fetchItemListThunk,
} from '../redux/productSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItemListThunk())
  }, [dispatch]);

  return (
    <React.Fragment>
      <ItemCardAll />
    </React.Fragment>
  )
};

export default Home;