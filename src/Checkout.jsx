import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// load components
import HeaderInner from "./component/HeaderInner";
import AppContext from './component/GlobalVars';
import { checkTimeRequired, remove_from_cart, getCartItemData, getTotalTime, getTotalCost, getAllServiceID, getAllServicePricing, getAllServiceTime, emptyCartItems, getTotalCartItem } from './component/Helper';
import PagePreLoader from './component/PagePreLoader';

function Checkout() {

    const [payment_mode, setpayment_mode] = useState("cash");
    const [name, setname] = useState("");
    const [phone_no, setphone_no] = useState("");
    const [email, setemail] = useState("");
    const [booking_date, setbooking_date] = useState("");
    const [booking_time, setbooking_time] = useState("");
    const [cartItemData, setCartItemData] = useState([]);
    const [cartItemNo, setCartItemNo] = useState(getTotalCartItem());

    const [apiLoaded, setApiLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate();

    const [enableEmailField, setEnableEmailField] = useState(false);
    const [enableDateField, setEnableDateField] = useState(false);
    const [enableTimeField, setEnableTimeField] = useState(false);

    // create a function when payment mode is changed to online enable email field set to true
    useEffect(() => {
        if (payment_mode == "online") {
            setEnableEmailField(true);
        } else {
            setEnableEmailField(false);
        }
    })

    // create a function to check if any product or service has time_required set to true
    useEffect(() => {
        if (checkTimeRequired()) {
            setEnableDateField(true);
            setEnableTimeField(true);
        } else {
            setEnableDateField(false);
            setEnableTimeField(false);
        }
    })

    // create a function to fetch cart items data from api
    // submit cart item data in post method
    useEffect(() => {
        var formdata = new FormData();
        formdata.append("cartData", getCartItemData());

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(AppContext.apiUrl + "cart", requestOptions)
            .then(response => { return response.json() })
            .then(data => {
                if (data.success == true) {
                    setCartItemData(data.cartItems);
                }
                setApiLoaded(true);
                // setIsLoaded(false);
            })

    }, [])

    // create a function to remove cart item from cart and refetch cart items
    const removeCartItem = (id) => {
        remove_from_cart(id);
        setApiLoaded(false);

        // update apicontext cartitem variable
        AppContext.totalCartItems = getTotalCartItem();
        setCartItemNo(getTotalCartItem());

        var formdata = new FormData();
        formdata.append("cartData", getCartItemData());

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(AppContext.apiUrl + "cart", requestOptions)
            .then(response => { return response.json() })
            .then(data => {
                if (data.success == true) {
                    setCartItemData(data.cartItems);
                }
                setApiLoaded(true);
                // setIsLoaded(false);
            })
    }

    // create a function to book the services in the cart
    const createBooking = () => {
        // check if payment mode is not empty
        if (payment_mode == "") {
            MySwal.fire({
                title: <strong>Opps!</strong>,
                html: <p>Please select payment method</p>,
                icon: 'error'
            })
            return;
        }
        // if payment method is online check email is not empty
        if (payment_mode == "online" && email == "") {
            MySwal.fire({
                title: <strong>Opps!</strong>,
                html: <p>Please enter email</p>,
                icon: 'error'
            })
            return;
        }

        // check if name and phone is not empty
        if (name == "" || phone_no == "") {
            MySwal.fire({
                title: <strong>Opps!</strong>,
                html: <p>Please enter name and phone</p>,
                icon: 'error'
            })
            return;
        }

        // if time is required then booking date and time field should not be empty
        if (checkTimeRequired()) {
            if (booking_date == "" || booking_time == "") {
                MySwal.fire({
                    title: <strong>Opps!</strong>,
                    html: <p>Please select booking date and time</p>,
                    icon: 'error'
                })
                return;
            }
        }

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("phone_no", phone_no);
        formdata.append("email", email);
        formdata.append("booking_date", booking_date);
        formdata.append("booking_time", booking_time);
        formdata.append("service_list", JSON.stringify(getAllServiceID()));
        formdata.append("service_pricing", JSON.stringify(getAllServicePricing()));
        formdata.append("service_times", JSON.stringify(getAllServiceTime()));
        formdata.append("total_time", getTotalTime());
        formdata.append("subtotal", getTotalCost());
        formdata.append("total_cost", getTotalCost());
        formdata.append("amount_recieved", 0);
        formdata.append("amount_due", getTotalCost());
        formdata.append("status", 'pending');
        formdata.append("payment_mode", payment_mode);
    
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
    
        fetch(AppContext.apiUrl + "booking", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    emptyCartItems();
                    MySwal.fire({
                        title: <strong>Thank You!</strong>,
                        html: <p>{data.message}</p>,
                        icon: 'success'
                    }).then(navigate(`/bookingdetails/${data.bookingData.id}`));
                } else {
                    MySwal.fire({
                        title: <strong>Opps!</strong>,
                        html: <p>{data.message[0]}</p>,
                        icon: 'error'
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    return <>
        <div className="main-wrap inner-page shop-details">
            <HeaderInner totalCartItems={getTotalCartItem()} />
            <section className="my-cart payments">
                <div className="payment-options">
                    <div className="custom-radio">
                        <label><input name="payment_mode" type="radio" value="online" disabled onChange={(e) => setpayment_mode(e.target.value)} /> Pay Online</label>
                        <label><input name="payment_mode" type="radio" value="cash" onChange={(e) => setpayment_mode(e.target.value)} checked /> Pay Cash</label>
                    </div>
                    <div className="coupone-wrap">
                        <button className="accordion">
                            <ion-icon name="gift-outline"></ion-icon> Booking Details
                        </button>
                        <div className="coupone-form" style={{ display: 'block' }}>
                            <fieldset>
                                <input type="text" className="form-control" placeholder="Your Full Name" name='name' onChange={(e) => setname(e.target.value)} />
                            </fieldset>
                            <fieldset>
                                <input type="text" className="form-control" placeholder="Your Phone No." name='phone_no' onChange={(e) => setphone_no(e.target.value)} />
                            </fieldset>
                            <fieldset style={enableEmailField ? {} : { display: 'none' }}>
                                <input type="email" className="form-control" name='email' placeholder='Your Email' onChange={(e) => setemail(e.target.value)} />
                            </fieldset>
                            <fieldset style={enableDateField ? {} : { display: 'none' }}>
                                <label style={{padding: '10px 0'}}>Booking Date</label>
                                <input type="date" className="form-control" name='booking_date' placeholder='Booking Date' onChange={(e) => setbooking_date(e.target.value)} />
                            </fieldset>
                            <fieldset style={enableTimeField ? {} : { display: 'none' }}>
                                <label style={{padding: '10px 0'}}>Booking Time</label>
                                <input type="time" className="form-control" name='booking_time' placeholder='Booking Time' onChange={(e) => setbooking_time(e.target.value)} />
                            </fieldset>
                            <small>Fill up all your details to proceed with the booking.</small>
                        </div>
                    </div>
                </div>
                <div id="productList">
                    {apiLoaded ? <>
                        {cartItemData.map((cartItem) => (
                            <div className="search-item-wrap" key={cartItem.id}>
                                <div className="search-item">
                                    <div className="title-div">
                                        <h5>{cartItem.name}</h5>
                                        <div className="price"><strong>{cartItem.price}/-</strong> </div>
                                    </div>
                                    <div className="item-image">
                                        {cartItem.image != null ?
                                            <img src={`${AppContext.uploadUrl}${cartItem.image}`} alt="" />
                                            :
                                            <img src="/images/buy.png" alt="" />
                                        }
                                    </div>
                                </div>
                                <div className="cart-btn-group">
                                    <ul>
                                        <li><a href="#" onClick={() => removeCartItem(cartItem.id)}>
                                            <ion-icon name="trash-outline"></ion-icon> Remove Service
                                        </a></li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </> : ''}
                </div>
                <div className="price-details">
                    <div className="checkout-table">
                        <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                            <tr>
                                <th colSpan="2" scope="col">Price Details</th>
                            </tr>
                            <tr>
                                <td>Service Selected</td>
                                <td>{AppContext.totalCartItems} Service(s)</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{getTotalCost()}/- </td>
                            </tr>
                            <tr>
                                <td>Amount Payable</td>
                                <td>{getTotalCost()}/- </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
        </div>
        <div className="total-price">
            <ul>
                <li>
                    <h6>{getTotalCost()}/- </h6><a href="#">View Price Details</a>
                </li>
                <li><a className="basic-btn" onClick={createBooking}>Continue</a></li>
            </ul>
        </div>
        <div className="overlay"></div>
    </>
}

export default Checkout;