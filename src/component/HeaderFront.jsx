import { Link } from 'react-router-dom';
import {IonIcon} from "react-ion-icon";
import { React, useState, useEffect } from 'react';
import AppContext from './GlobalVars';

function HeaderFront(props) {
  return <>
    <header className="shop-header">
      <div className="shop-navbar">
        <ul className="left-nav">
          <li><a className="menu-link white-ripple" id="sidebarCollapse"><span className="lnr lnr-menu"></span></a></li>
          <li><Link to="/home" className="menu-link brand white-ripple"><img src="/logo.png" alt="" className="basic-logo" /></Link></li>
        </ul>
        <ul className="right-nav">
          <li>
            {/* <Link to="/" className="menu-link white-ripple">
              <IonIcon name="notifications"></IonIcon><span className="notification">0</span>
            </Link> */}
          </li>
          <li>
            <Link to="/checkout" className="menu-link white-ripple">
              <IonIcon name="cart"></IonIcon><span className="notification">{AppContext.totalCartItems}</span>
            </Link>
          </li>
          <li>
            {/* <Link to="/search" className="menu-link white-ripple">
              <IonIcon name="search-outline"></IonIcon>
            </Link> */}
          </li>
        </ul>
      </div>
    </header>
  </>
}

export default HeaderFront;