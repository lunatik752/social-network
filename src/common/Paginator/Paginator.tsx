import React, {useState} from 'react';
import styles from './Paginator.module.css'
import cn from 'classnames'

type PropsTypes = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (page: number) => void
    portionSize?: number

}

const Paginator: React.FC<PropsTypes> = React.memo(({totalItemsCount, pageSize, currentPage = 1, onPageChanged = (x: any) => x, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize - 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const onPrevButtonClick = () => {
        setPortionNumber(portionNumber - 1);
    }

    const onNextButtonClick = () => {
        setPortionNumber(portionNumber + 1);
    }

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 &&
            <button className={styles.prevNextButton} onClick={onPrevButtonClick}> &lt;&lt;  Previous</button>}

            {pages
                .filter(page => page >= leftPortionPageNumber  &&  page <= rightPortionPageNumber)
                .map((page) => {
                    return <span key={page}
                                 className={ cn({[styles.selectedPage]: currentPage === page}, styles.pageNumber) }
                                 onClick={(e) => {
                                     onPageChanged(page)
                                 }}>{page}</span>
                })}
            {portionCount > portionNumber &&
            <button className={styles.prevNextButton} onClick={onNextButtonClick}>Next &gt;&gt;</button>}
        </div>

    )
});


export default Paginator;
