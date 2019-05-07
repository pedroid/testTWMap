import React, { useState, useEffect, Fragment } from 'react';
import { DataManager } from '../DataManager'

const Map = () => {
    const [ loading, setLoading ] = useState([...DataManager.loading]);
    return (
        <div></div>
    )
};

export default Map;