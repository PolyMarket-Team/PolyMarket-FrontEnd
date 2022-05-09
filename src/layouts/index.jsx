import React from "react";
import Navigation from "@components/Navigation";
import Footer from "@components/Footer";

const Layout = (props) => {
    return props.auth ? (
        <>
            <>{props.children}</>
            <Footer />
        </>
    ) : (
        <>
            <Navigation />
            <>{props.children}</>
            <Footer />
        </>
    );
};

export default Layout;
