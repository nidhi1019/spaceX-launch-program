import React, { Fragment } from 'react';
import Card from './card/card';
const Cards = (props) => {
    return (
        <Fragment>
            {
            props && props.spaceXData.length > 0 ? 
            props.spaceXData.map(item => {
                return <Card details={item} key={item.flight_number + item.launch_date_unix}></Card>
            }): <h1>No Data Found</h1>
        }
        </Fragment>
    )
}
export default Cards;