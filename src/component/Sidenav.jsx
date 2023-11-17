import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import $ from "jquery";
import { IonIcon } from "react-ion-icon";
import { Share } from '@capacitor/share';

// load components
import AppContext from './GlobalVars';

function Sidenav(props) {

  const navigate = useNavigate();

  useEffect(() => {
    $('#dismiss, .overlay').on('click', function () {
      $('#sidebar').removeClass('active');
      $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').addClass('active');
      $('.overlay').addClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  });

  const share = async () => {
    // check if share is supported
    const isAvailable = await Share.canShare();
    if (isAvailable) {
      await Share.share({
        title: 'Bike & Car Wash Lab',
        text: 'Best Bike & Car Servicing App in Naihati, West Bengal',
        url: 'https://play.google.com/store/apps/details?id=com.bikeandcarservice.app',
        dialogTitle: 'Share with friends'
      });
    }
  }

  return <>
    <nav id="sidebar" className="side-nav shop-nav">
      <div id="dismiss">
        <IonIcon name="arrow-back-outline"></IonIcon>
      </div>
      <div className="sidebar-header">
        <div className="logo"><img src="/logo.png" alt="" /></div>
      </div>
      <ul className="list-unstyled components">
        <li>
          <a className="white-ripple" onClick={share}>
            <IonIcon name="share-social-outline"></IonIcon> Share With Friends
          </a>
        </li>
        <div className="devider"></div>
        <li>
          <a className="white-ripple" href="https://www.facebook.com/profile.php?id=61551862275433" target='_blank'>
            <IonIcon name="logo-facebook"></IonIcon> Follow on Facebook
          </a>
        </li>
        <div className="devider"></div>
        <li><a className="white-ripple" href="https://bikeandcarwash.in/about-us" target="_blank">
          <IonIcon name="document-outline"></IonIcon> About Us
        </a></li>
        <li><a className="white-ripple" href="https://bikeandcarwash.in/#contact" target="_blank">
          <IonIcon name="document-outline"></IonIcon> Contact Us
        </a></li>
        <li><a className="white-ripple" href="https://www.google.com/maps/dir//22.8869167,88.4256111/@22.8869167,88.4256111,16z?entry=ttu" target="_blank">
          <IonIcon name="document-outline"></IonIcon> Get Direction
        </a></li>
        <li><a className="white-ripple" href="https://bikeandcarwash.in/terms-and-conditions" target="_blank">
          <IonIcon name="document-outline"></IonIcon> Terms & Conditions
        </a></li>
        <li><a className="white-ripple" href="https://bikeandcarwash.in/privacy-policy" target="_blank">
          <IonIcon name="document-outline"></IonIcon> Privacy Policy
        </a></li>
        <li><a className="white-ripple" href="https://bikeandcarwash.in/refund-policy" target="_blank">
          <IonIcon name="document-outline"></IonIcon> Refund Policy
        </a></li>
      </ul>
    </nav>
  </>
}

export default Sidenav;