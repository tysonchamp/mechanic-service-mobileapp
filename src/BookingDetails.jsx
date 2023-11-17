import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// load components
import Sidenav from "./component/Sidenav";
import HeaderInner from "./component/HeaderInner";
import BottomNav from "./component/BottomNav";
import AppContext from './component/GlobalVars';
// import { getPrice, getOtherPrice } from './component/Helper';
import PagePreLoader from './component/PagePreLoader';

function Home() {

    const [bookingDetails, setBookingDetails] = useState("");
    const [userDetails, setUserDetails] = useState("");
    const [service_list_ids, setServiceListIds] = useState([]);
    const [service_list_name, setServiceListName] = useState([]);
    const [service_amounts_purchased, setServiceAmountsPurchased] = useState([]);
    const location = useLocation();

    const [apiLoaded, setApiLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        let pathname = location.pathname.split('/');
        console.log(pathname);
        var formdata = new FormData();
        formdata.append("booking_id", pathname[2]);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(AppContext.apiUrl + "getdetails", requestOptions)
        .then(response => { return response.json() })
        .then(data => {
            if (data.success == true) {
                setBookingDetails(data.booking);
                setUserDetails(data.booking.user);
                setServiceListIds(data.service_list_ids);
                setServiceListName(data.service_list_name);
                setServiceAmountsPurchased(data.service_amounts_purchased);
                setApiLoaded(true);
                // setIsLoaded(false);
                window.open(`https://bikeandcarwash.in/download/${data.booking.id}`, '_blank');
            }
        })
    }, [])

    return <>
        <div className="main-wrap inner-page shop-details">
            <HeaderInner />
            <div className="fluid-box price-details shipping">
                <div className="checkout-table">
                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                        <tr>
                            <th colSpan="2" scope="col">Booking Details</th>
                        </tr>
                        <tr>
                            <td colSpan="2" scope="col">
                                <strong>{userDetails.name}</strong><br />
                                <p>Phone: {userDetails.phone_no}</p>
                                <p>Date: {bookingDetails.booking_date}</p>
                                <p>Time: {bookingDetails.booking_time}</p>
                                <p>Payment Mode: {bookingDetails.payment_mode}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="price-details">
                <div className="checkout-table">
                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                        <tr>
                            <th colSpan="2" scope="col">Price Details</th>
                        </tr>
                        <tr>
                            <td>Order ID</td>
                            <td>#INV-{bookingDetails.id}</td>
                        </tr>
                        {service_list_name && service_list_name.map((item, index) => {
                            return <tr key={index}>
                                <td>{item}</td>
                                <td>{service_amounts_purchased[index]}/-</td>
                            </tr>
                        })}
                        <tr>
                            <td>Total Cost</td>
                            <td>{bookingDetails.total_cost}/- </td>
                        </tr>
                        <tr>
                            <td>Amount Paid</td>
                            <td>{bookingDetails.amount_recieved}/- </td>
                        </tr>
                        <tr>
                            <td>Amount Due</td>
                            <td>{bookingDetails.amount_due}/- </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="cart-btn-group basic">
                <ul>
                <li><a href={`https://bikeandcarwash.in/download/${bookingDetails.id}`} target="_blank" download={true}>Download</a></li>
                </ul>
            </div>
        </div>
        <div className="overlay"></div>
    </>
}

export default Home;