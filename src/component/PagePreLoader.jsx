import { React, useEffect, useState } from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import $ from 'jquery';

function PagePreLoader() {

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            navigate('/home');
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <>
        <div className="se-pre-con">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
        <div className="overlay"></div>
    </>
}

export default PagePreLoader;