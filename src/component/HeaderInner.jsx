import { Link } from 'react-router-dom';
import {IonIcon} from "react-ion-icon";
import { React, useState, useEffect } from 'react';
import AppContext from './GlobalVars';

function HeaderInner(props) {

  const [totalCartItems, setTotalCartItems] = useState("");

  useEffect(() => {
    setTotalCartItems(AppContext.totalCartItems);
  }, [])

  return <>
    <header className="shop-header">
      <div className="shop-navbar">
        <ul className="left-nav">
          <li><Link to="/home" className="menu-link back-btn">
            <IonIcon name="arrow-back-outline"></IonIcon>
          </Link></li>
          <li><Link href="#" className="menu-link item-title"><small>{props.title}</small></Link></li>
        </ul>
        <ul className="right-nav">
          <li><Link to="/checkout" className="menu-link">
            <IonIcon name="cart"></IonIcon><span className="notification">{props.totalCartItems == "" || props.totalCartItems == null ? totalCartItems : props.totalCartItems}</span>
          </Link></li>
          <li>
            {/* <Link to="/search" className="menu-link">
              <IonIcon name="search-outline"></IonIcon>
            </Link> */}
          </li>
        </ul>
      </div>
    </header>
  </>
}

export default HeaderInner;