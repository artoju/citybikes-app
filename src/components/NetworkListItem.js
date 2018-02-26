import React from 'react';
import PropTypes from 'prop-types';

const NetworkListItem = props => {

    NetworkListItem.propTypes = {
        id: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired, 
        lng: PropTypes.number.isRequired,
        select: PropTypes.func.isRequired
    } 

    const handleClick = (e) => {
        const city = {id: props.id,
            city: props.city,
            country: props.country,
            lat: props.lat,
            lng: props.lng,}
            props.select(city);
    }

    return (
    <li><button onClick={handleClick}>
        {props.city} {props.country}
    </button></li> 
    );
}

export default NetworkListItem;