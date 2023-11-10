import {
    NavLink,
    Outlet, useLoaderData,
} from 'react-router-dom';
import {ReactElement, useEffect} from 'react';
import {CV} from '../state/cv.ts';

/**
 * This is the root "interactive CV" route content.
 */
export default function Root(): ReactElement {
    const {
        contact
    } = useLoaderData() as CV;

    useEffect(() => {
        if(contact?.name) {
            document.title = `${contact?.name} - Resume & Portfolio`
        }
    }, [contact]);

    return (
        <>
            <nav className="top">
                <ul>
                    <li><NavLink to="/">Resume</NavLink></li>
                    <li><NavLink to="/projects">Portfolio</NavLink></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}