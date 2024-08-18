import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const About = (props) => {

    useEffect(() => {
        props.setProgress(10); // Set progress to 10% initially
        setTimeout(() => {
            props.setProgress(100); // Set progress to 100% after 1 second
        }, 300);
    }, []);

    return (
        <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold mb-4">About Us</h1>
            <div className="col-lg-8 mx-auto mt-4">
                <p className="mt-4">
                    Hello! I am Pratik Ginoya, and this is my React.js project to learn how to fetch data from an API or server and manage it on the client side.
                </p>
                <p className="mt-4">
                    This project is designed to read news, with all news data retrieved through the API.
                </p>
                <p className="mt-4">
                    I have implemented an infinite scroll with a spinner and also added a top loading bar.
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <Link to="/" className="btn btn-dark mt-3 mx-1">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About;
