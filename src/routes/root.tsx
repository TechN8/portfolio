import {
    NavLink,
    Outlet,
} from 'react-router-dom';
import {ReactElement} from "react";

/**
 * This is the root "interactive CV" route content.
 */
export default function Root(): ReactElement {
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink to="/">CV</NavLink></li>
                    <li><NavLink to="/projects">Portfolio</NavLink></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}