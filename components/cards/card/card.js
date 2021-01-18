import React from 'react';

import styles from './card.module.css';
const Card = (props) => {
    return (
        <div className={styles.card}>
            <div>
                <img src={props.details.links.mission_patch_small} className={styles.responsiveImg}></img>
            </div>
            <strong>{props.details.mission_name} #{props.details.flight_number}</strong>
            <dl>
                <dt><strong>Mission Ids:</strong></dt>
                <dd>
                    <ul>
                        {
                            props.details.mission_id.map(elem => {
                                return <li key={elem}>{elem}</li>;
                            })
                        }
                    </ul>
                </dd>
                <dt><strong>Launch Year:</strong> <span>{props.details.launch_year}</span></dt>
                <dt><strong>Successful Launch:</strong> <span>{`${props.details.launch_success}`}</span></dt>
                <dt><strong>Successful Landing:</strong> <span>{props.details.rocket.first_stage && props.details.rocket.first_stage.cores.length > 0 ?
                `${props.details.rocket.first_stage.cores[0].land_success}` : ''}</span></dt>
            </dl>
        </div>
    )
}
export default Card;