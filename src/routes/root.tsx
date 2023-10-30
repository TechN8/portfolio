import {
    useLoaderData,
} from 'react-router-dom';
import {
    CV
} from '../cv.ts'

function Heading({cv}: { cv: CV }) {
    const {contact} = cv;

    return (
        <div id="heading">
            <h1>{contact.name}</h1>
            <div>{contact.title}</div>
        </div>
    );
}

/**
 * This is the root "interactive CV" route content.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Root() {
    const { cv } = useLoaderData() as { cv: CV } ;

    return (
        <>
            <Heading cv={cv}/>
            <div id="main">
                <div id="sidebar">
                    <div id="contact">
                        <h2>Contact</h2>
                        <ul>
                        {cv.contact.links.map((link) => {
                            return (
                                <li id={link.href}>
                                    <a href={link.href}>{link.text}</a>
                                </li>
                            )
                        })}
                        </ul>
                    </div>
                    <div id="skills"><h2>Skills</h2></div>
                    <div id="education"><h2>Education</h2></div>
                    <div id="interests"><h2>Interests</h2></div>
                </div>
                <div id="content">
                    <div id="experience"><h2>Experience</h2></div>
                    <div id="projects"><h2>Projects</h2></div>
                </div>
            </div>
            *
            {JSON.stringify(cv)}
        </>
    );
}