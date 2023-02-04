import "./assets/styles/App.scss";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Massage from "./pages/Massage";
import NotFound from "./pages/NotFound";

function resize() {
    if (window.innerWidth < 900) {
        document.body.classList.add("mobile")
    }
}

export default function App() {
    let [menu, setMenu] = useState("massage");

    useEffect(() => {

        // document.addEventListener("wheel", (event) => {
        //     if (event.deltaY < 0) {
        //         console.log("scrolling up");
        //         document.textContent = "scrolling up";
        //     } else if (event.deltaY > 0) {
        //         console.log("scrolling down");
        //         document.textContent = "scrolling down";
        //     }
        // });


        document.body.classList.add('loaded-page')

        window.addEventListener("resize", resize)

        return () => {
            document.body.classList.remove('loaded-page')
        }
    }, []);

    return (
        <div className="App">
            {/* 
                <div className="nav nav--left">
                    <nav className="nav">
                        <ul className="menu">
                            <li className="menu-item">
                                <span
                                    className="menu-link"
                                    // onClick={() => {
                                    //     setMenu("massage");
                                    // }}
                                >
                                    one
                                </span>
                            </li>
                            <li className="menu-item">
                                <span
                                    className="menu-link"
                                    // onClick={() => {
                                    //     setMenu("me");
                                    // }}
                                >
                                    two
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>

            <div className="nav nav--right nav--me">
                <nav className="nav">
                    <ul className="menu">
                        <li className="menu-item">
                            <NavLink to="" className="menu-link">
                                home
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink to="about" className="menu-link">
                                about
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                to="contacts"
                                className="menu-link"
                            >
                                contacts
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                to="interests"
                                className="menu-link"
                            >
                                interests
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div> */}

            <div className="main">
                <Routes>
                    <Route index element={<Home />}></Route>
                    <Route path="about" element={<About />} />
                    <Route path="massage" element={<Massage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}
