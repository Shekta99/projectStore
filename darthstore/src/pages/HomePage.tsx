import React from "react";
import MainComponent from "./swapi/Main";
import "../styles/pages/home.css";


const HomePage: React.FC = () => {
    return (
        <div>
            <h1 className="homeTittle">Welcome</h1>
            <MainComponent />

        </div>
    )
}

export default HomePage;