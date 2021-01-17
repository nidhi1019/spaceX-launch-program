import styles from './filter.module.css';
import React from 'react';

const Filter = (props) => {
    return  (
    <div className={styles.filter}>{props.isSelected}
        <label className={props.isSelected ? styles.active : null}
        onClick={props.onFilterClick}>{props.label}</label> 
    </div>
    )
}
export default Filter;