import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./screen/Home";
import Jalousie from "./screen/Jalousie";

const colors: string[] = ["#916d86", "#d690c1", "#7f5d97"];
// const INTERVAL = 3000;

export default function App() {
    let [menu, setMenu] = useState("massage");

    useEffect(() => {
        document.addEventListener("wheel", (event) => {
            if (event.deltaY < 0) {
                console.log("scrolling up");
                document.textContent = "scrolling up";
            } else if (event.deltaY > 0) {
                console.log("scrolling down");
                document.textContent = "scrolling down";
            }
        });
    });

    useEffect(() => {
        const overlayList: NodeListOf<HTMLElement> | null =
            document.querySelectorAll(".main");

        function changeBG() {
            overlayList &&
                overlayList.forEach((overlay) => {
                    overlay.style.backgroundColor = randomcolor();
                });
        }

        // setInterval(changeBG, INTERVAL);

        function randomcolor() {
            return colors[Math.floor(Math.random() * colors.length)];
        }
        // overlayList?.length && overlayList.addEventListener("click", changeBG);
    }, []);
    return (
        <div className="App">
            <div className="page__overlay">
                <div className="page">
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
                        <div className="screen">
                            <Routes>
                                <Route index element={<Home />}></Route>
                                <Route path="jalousie" element={<Jalousie />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
            </header>
        </div>
    );
}
