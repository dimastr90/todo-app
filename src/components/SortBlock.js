import React from 'react'


const SortBlock = (props) => {

    const sortOnClickHandler = (e) => {
        props.setCurrentSort(e.currentTarget.dataset.sort);
    };

    return(
        <div className='sortBlockCont'>
            <a href='#/' data-sort='none' onClick={sortOnClickHandler} className={props.currentSort==='none'? 'active' : 'notActive'}>All</a>
            <a href='#/completed' data-sort='done' onClick={sortOnClickHandler} className={props.currentSort==='done'? 'active' : 'notActive'}>Completed</a>
            <a href='#/active' data-sort='active' onClick={sortOnClickHandler} className={props.currentSort==='active'? 'active' : 'notActive'}>Active</a>
        </div>
    )
};



export default SortBlock;