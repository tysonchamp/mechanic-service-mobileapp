import { Outlet, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'

// load components
import AppContext from './component/GlobalVars.jsx'

// user area pages
import PagePreLoader from './component/PagePreLoader.jsx';
import Home from './Home.jsx';
import BookingDetails from './BookingDetails.jsx'
import Checkout from './Checkout.jsx'

function App() {

  return (
    <>
      <Helmet>
        <title>ReactJs Ecommerce App</title>
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        {/* <link href="/css/animate.css" rel='stylesheet' type='text/css' /> */}
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        {/* js lists */}
      </Helmet>

      <Routes>
        {/* login & registration */}
        <Route path="/" element={<PagePreLoader />} />
        {/* products pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bookingdetails/*" element={<BookingDetails />} />
      </Routes>
    </>
  )
}

export default App
