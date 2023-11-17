import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// load components
import Sidenav from "./component/Sidenav";
import HeaderFront from "./component/HeaderFront";
import BottomNav from "./component/BottomNav";
import AppContext from './component/GlobalVars';
import { addToCart } from './component/Helper';
import PagePreLoader from './component/PagePreLoader';

function Home() {

  const [twoWheelers, setTwoWheelers] = useState("");
  const [fourWheelers, setFourWheelers] = useState("");
  const [bannerImgs, setBannerImgs] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect((event) => {
    var requestOptions = {
      method: 'GET',
      // body: formdata,
      redirect: 'follow'
    };

    fetch(AppContext.apiUrl + "home", requestOptions)
      .then(response => { return response.json() })
      .then(data => {
        setTwoWheelers(data.twoWheelers);
        setFourWheelers(data.fourWheelers);
        setBannerImgs(data.banners);
        setApiLoaded(true);
      })
  }, []);

  const handleCartButton = (productID, time_required, price, time) => {
    setIsLoaded(false);
    addToCart(productID, time_required, price, time);
    setIsLoaded(true);
    navigate("/checkout");
  }

  return <>
    <Sidenav />
    {/* header goes here */}
    <div className="main-wrap inner-page shopping-page">
      <HeaderFront />
      <section className="fluid-box">
        <div className="slider-wrap full-slider" style={{ borderRadius: '10px' }}>
          {apiLoaded == true
            ?
            <div className="">
              {bannerImgs && <OwlCarousel className='owl-carousel' items={1} autoPlay={true} loop={true} nav={false} dots={true}>
                {bannerImgs.map((banner) => (<Link to="#" className="item" key={banner.id}>
                  <div className="slide-image">
                    <img src={`${AppContext.uploadUrl}${banner.image}`} alt="" />
                  </div>
                </Link>))}
              </OwlCarousel>}
            </div>
            :
            <Skeleton height={200} />
          }
        </div>
      </section>
      <section className="fluid-box shoping-section">
        <div className="product-wrap">
          <div className="container">
            <div className="product-group-item">
              <a className="slide-title" href="#">
                <h5>4 Wheeler</h5>
                <small>Services</small>
              </a>
              <div className="product-group">
                <div className="group-wrap">
                  <div className="row">
                    {apiLoaded == true
                      ?
                      <>
                        {fourWheelers && fourWheelers.map((fourWheeler) => (
                          <div className="col-6" key={fourWheeler.id}>
                            <a className="product-list-item">
                              <div className="product-image">
                                {fourWheeler.image != null ?
                                  <img src={`${AppContext.uploadUrl}${fourWheeler.image}`} alt="" />
                                  :
                                  <img src="/images/buy.png" alt="" />
                                }
                              </div>
                              <div className="product-details">
                                <h6>{fourWheeler.name}</h6>
                                <small>Rs. {fourWheeler.price}/-</small>
                                <button onClick={e => handleCartButton(fourWheeler.id, fourWheeler.time_required, fourWheeler.price, fourWheeler.time)} className="basic-btn">Book Now</button>
                              </div>
                            </a>
                          </div>
                        ))}
                      </>
                      :
                      <Skeleton height={200} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-group ad">
          <div className="ad-banner"><a href="#" className="product-list-item">
            <div className="product-image"><img src="/images/car.jpg" alt="" /></div>
          </a></div>
        </div>
        <div className="product-wrap">
          <div className="container">
            <div className="product-group-item">
              <a className="slide-title" href="product-listing.html">
                <h5>2 Wheeler</h5>
                <small>Services</small>
              </a>
              <div className="product-group">
                <div className="group-wrap">
                  <div className="row">
                    {apiLoaded == true
                      ?
                      <>
                        {twoWheelers && twoWheelers.map((twoWheeler) => (
                          <div className="col-6" key={twoWheeler.id}>
                            <a className="product-list-item">
                              <div className="product-image">
                                {twoWheeler.image != null ?
                                  <img src={`${AppContext.uploadUrl}${twoWheeler.image}`} alt="" />
                                  :
                                  <img src="/images/buy.png" alt="" />
                                }
                              </div>
                              <div className="product-details">
                                <h6>{twoWheeler.name}</h6>
                                <small>Rs. {twoWheeler.price}/-</small>
                                <button onClick={e => handleCartButton(twoWheeler.id, twoWheeler.time_required, twoWheeler.price, twoWheeler.time)} className="basic-btn">Book Now</button>
                              </div>
                            </a>
                          </div>
                        ))}
                      </>
                      :
                      <Skeleton height={200} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-group ad">
          <div className="ad-banner">
            <a href="#" className="product-list-item">
              <div className="product-image"><img src="/images/footban.jpg" alt="" /></div>
            </a>
          </div>
        </div>
      </section>
      {/* bottom nav bar here */}
      <BottomNav />
    </div>
  </>
}

export default Home;