import { Link } from 'react-router-dom';

function Loader() {
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

export default Loader;