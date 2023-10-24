import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BreweryDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState({});

    useEffect(() => {
        console.log(params.id)
        getDetails();
    }, [])

    const getDetails = async () => {
        const details = await fetch(`https://api.openbrewerydb.org/v1/breweries/${params.id}`)
        const detailsJson = await details.json();
        console.log(detailsJson);
        setFullDetails(detailsJson);
    }

    return (
        <>
            <h1> {fullDetails.name}</h1>
            <h2> Location: {fullDetails.city}, {fullDetails.state} </h2>
            <a href={fullDetails.website_url}> Website </a>
        </>
    );
  };
  
  export default BreweryDetail;