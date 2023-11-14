import { json } from "react-router-dom";
import AppContext from './GlobalVars';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ListingSkeleton() {
    return <>
        {/* 1 */}
        <div className="search-item-wrap" >
            <Skeleton height={100} />
        </div>
        {/* 2 */}
        <div className="search-item-wrap" >
            <Skeleton height={100} />
        </div>
        {/* 3 */}
        <div className="search-item-wrap" >
            <Skeleton height={100} />
        </div>
        {/* 4 */}
        <div className="search-item-wrap" >
            <Skeleton height={100} />
        </div>
        {/* 5 */}
        <div className="search-item-wrap" >
            <Skeleton height={100} />
        </div>
        {/* 6 */}
        <div className="search-item-wrap" >
            <Skeleton height={100} />
        </div>
        {/* end */}
    </>
}

export default ListingSkeleton;