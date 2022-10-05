import React from "react";

import Header from "./Header";
import UserGuide from "./UserGuide";
import About from "../about/About";
import Team from "./Team";

const Home = () => {
    return (
        <div className="home">
            <Header />
            <UserGuide />
            <About />
            <Team />
        </div>
    )
};

export default Home;
