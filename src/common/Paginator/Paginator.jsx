import React from 'react';
import style from './Paginator.module.css'


const Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return (
        <div>
            {pages.map(page => {
                return <span key={page.id}
                             className={props.currentPage === page && style.selectedPage}
                             onClick={(e) => {
                                 props.onPageChanged(page)
                             }}>{page} </span>
            })}
        </div>

    )
};


export default Paginator;