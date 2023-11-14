import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

// load components
import AppContext from './component/GlobalVars.jsx'
import { getTotalCartItem } from './component/Helper.jsx';

// globar variable
const testApi = 'http://127.0.0.1:8000/';
const liveApi = 'https://bikeandcarwash.in/';
AppContext.apiUrl = liveApi + "api/";
AppContext.uploadUrl = liveApi;
AppContext.totalCartItems = getTotalCartItem();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
