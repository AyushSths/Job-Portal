
import './App.css';
import Navbar from './component/Navbar'
import Show from "./pages/product/Show";
import Login from './component/Login'
import Signup from './component/Signup'
import Front from './component/Front.jsx';
import Home from './component/Home';
import { BrowserRouter, Routes, Route, json } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from "./redux/slice/userSlice";
import axios from 'axios';
import Cart from './component/Cart';
import { setcart } from './redux/slice/cartSlice';
import Upsert from './pages/product/Upsert';
import Footer from './component/footer';
import Searchproduct from './component/Searchproduct';
import Favourites from './component/Favourites';
import Filter from "./pages/Filter"
import Orders from './component/Orders';
import Men from './pages/product/Men';
import Women from './pages/product/Women';
import Electronics from './pages/product/Electronics';
import Jewellery from './pages/product/Jewellery';
import Checkout from './pages/product/Checkout';
import OrderView from './pages/product/OrderView';

function App() {
  const dispatch = useDispatch();
  const [search_term, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {

    let access_token = localStorage.getItem("access_token")
    if (access_token) {
      let url = `${process.env.REACT_APP_SERVER_URL}/users/get-user`

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(res => {
          dispatch(setUser(res.data))
        })

    }

    let cart_items = localStorage.getItem("cart_items")
    if (cart_items) {
      dispatch(setcart(JSON.parse(cart_items)))
    }


  }, []);
  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className='container'>
        <Routes>
          <Route path="home" element={<Home search_term={search_term} />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="search_product" element={<Searchproduct search_term={search_term} />} />
          <Route path="cart" element={<Cart search_term={search_term} />} />
          <Route path="orders" element={<Orders />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="men" element={<Men search_term={search_term} />} />
          <Route path="women" element={<Women search_term={search_term} />} />
          <Route path="electronics" element={<Electronics search_term={search_term} />} />
          <Route path="jewellery" element={<Jewellery search_term={search_term} />} />
          <Route path="products">
            <Route index element={<Home />} />
            <Route path=":id" element={<Show />} />
            <Route path="edit/:id" element={<Upsert />} />
            <Route path="create" element={<Upsert />} />
            <Route path="view/:id" element={<OrderView />} />
          </Route>
          <Route path="footer">
            <Route index element={<Navbar />} />
            <Route path="about" element={<Footer />} />
            <Route path="contact" element={<Footer />} />
            <Route path="featured" element={<Front />} />
          </Route>
          <Route path="men's_clothing" element={<Filter />} />

          <Route path="*" element={<><Front search_term={search_term} /></>} />

        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;