import React, { useState } from "react";
import Link from "next/link";
import "../../page.css"

const Results = ({ params }) => {
    const user_email = decodeURIComponent(params.user_email);
    console.log(user_email);

    // fetch user results from the database
    const [userResults, setUserResults] = useState([]);

    const fetchUserResults = async () => {
        const response = await fetch(
            `http://localhost:5544/user/${user_email}`
        ).then((res) => res.json());
        console.log("response", response);

        setUserResults(response);        
    };
    fetchUserResults();


    

    return (
        <div className="Container">
            <div className="header">
                <div className="text">Results</div>
                <div className="underline"></div>
            </div>
            
        </div>
    );
}

export default Results;