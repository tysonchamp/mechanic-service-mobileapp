import { Link } from 'react-router-dom';
import {IonIcon} from "react-ion-icon";

import AppContext from './GlobalVars';

function BottomNav() {
  return <>
    <nav className="navbar">
      <ul>
        <li><Link to="/home" className="white-ripple active">
          <IonIcon name="home-outline"></IonIcon><br />Home
        </Link></li>
        <li><Link to="/checkout" className="white-ripple cart">
          <IonIcon name="cart"></IonIcon><span className="notification">{AppContext.totalCartItems}</span>
          <br />Cart
        </Link></li>
      </ul>
    </nav>
  </>
}

export default BottomNav;