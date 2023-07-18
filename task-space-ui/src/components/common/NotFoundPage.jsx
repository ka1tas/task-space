import React from 'react';
import {Link} from "react-router-dom";

    const NotFoundPage = () => (
        <div className="flex flex-col items-center m-10">
            <h1 className="text-2xl"> 404 ! Page not found page.</h1>
           <h2 className="text-blue-700">  <Link to={'/'}> Go back to home. </Link> </h2>
        </div>
    );

export default NotFoundPage;