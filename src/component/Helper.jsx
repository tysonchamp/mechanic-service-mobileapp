import { json } from "react-router-dom";
import AppContext from './GlobalVars';

export function stringToJson(text) {
    let jsonData = typeof text == 'string' && JSON.parse(text);
    return jsonData;
}

export function addToCart(productID, time_required, price, time){
    var current_data = { "id": productID, "time_required": time_required, "price": price, "time": time };
    var existing_data = localStorage.getItem("customer_cart");
    if (existing_data == null || existing_data == "[]") {
        existing_data = [];
        existing_data.push(current_data);
        localStorage.setItem("customer_cart", JSON.stringify(existing_data));
    } else {
        remove_from_cart(productID);
        existing_data = localStorage.getItem("customer_cart");
        existing_data = JSON.parse(existing_data);
        existing_data.push(current_data);
        localStorage.setItem("customer_cart", JSON.stringify(existing_data));
    }
    AppContext.totalCartItems = existing_data.length;
    console.log(AppContext.totalCartItems);
}

export function remove_from_cart(productID) {
    var all_data = localStorage.getItem("customer_cart");
    all_data = JSON.parse(all_data);
    var single_data;
    var new_data = [];
    for (var i = 0; i < all_data.length; i++) {
        single_data = all_data[i];
        if (productID == single_data.id) {
            continue;
        }
        new_data.push(single_data);
        //console.log(single_data.id);
    }
    //console.log(JSON.stringify(new_data));
    localStorage.setItem("customer_cart", JSON.stringify(new_data));
    AppContext.totalCartItems = new_data.length;
}

export function getTotalCartItem(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return 0
    }else{
        all_data = JSON.parse(all_data);
        return all_data.length;
    }
}

export function getCartItemData(){
    var all_data = localStorage.getItem("customer_cart");
    return all_data;
}

export function emptyCartItems(){
    localStorage.removeItem("customer_cart");
    AppContext.totalCartItems = 0;
}

export function getCurrency(){
    return '₹'
}

// create a function to check if any product or service has time_required set to true
export function checkTimeRequired(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return false
    }else{
        all_data = JSON.parse(all_data);
        for (var i = 0; i < all_data.length; i++) {
            var single_data = all_data[i];
            if (single_data.time_required == "Yes") {
                return true;
            }
        }
        return false;
    }
}

// create a function to calculate total time from cart data. if time is null then count it as 0 minutes.
// only if time_required is set to Yes.
export function getTotalTime(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return 0
    }else{
        all_data = JSON.parse(all_data);
        var total_time = 0;
        for (var i = 0; i < all_data.length; i++) {
            var single_data = all_data[i];
            if (single_data.time_required == "Yes") {
                if (single_data.time == null) {
                    total_time = total_time + 0;
                }else{
                    total_time = total_time + parseInt(single_data.time);
                }
            }
        }
        return total_time;
    }
}

// get total cost
export function getTotalCost(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return 0
    }else{
        all_data = JSON.parse(all_data);
        var total_cost = 0;
        for (var i = 0; i < all_data.length; i++) {
            var single_data = all_data[i];
            total_cost = total_cost + parseInt(single_data.price);
        }
        return total_cost;
    }
}

// get all service id in array
export function getAllServiceID(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return []
    }else{
        all_data = JSON.parse(all_data);
        var all_service_id = [];
        for (var i = 0; i < all_data.length; i++) {
            var single_data = all_data[i];
            all_service_id.push(single_data.id);
        }
        return all_service_id;
    }
}

// get all service pricing in array
export function getAllServicePricing(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return []
    }else{
        all_data = JSON.parse(all_data);
        var all_service_pricing = [];
        for (var i = 0; i < all_data.length; i++) {
            var single_data = all_data[i];
            all_service_pricing.push(single_data.price);
        }
        return all_service_pricing;
    }
}

// get all service time in array
export function getAllServiceTime(){
    var all_data = localStorage.getItem("customer_cart");
    if (all_data == null || all_data == "[]") {
        return []
    }else{
        all_data = JSON.parse(all_data);
        var all_service_time = [];
        for (var i = 0; i < all_data.length; i++) {
            var single_data = all_data[i];
            all_service_time.push(single_data.time);
        }
        return all_service_time;
    }
}