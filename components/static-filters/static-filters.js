import React from 'react';
import Filter from './filter/filter';

const StaticFilters = (props) => {
    const filters =  props.filters.map(item => {
        return <Filter label={item.value} key={item.value} isSelected={item.isSelected} onFilterClick={() => props.onFilterClick(item, props.name)} name={props.name}></Filter>
    })
    return filters;
}
export default StaticFilters;