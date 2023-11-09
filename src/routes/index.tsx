import {
    useLoaderData,
} from 'react-router-dom';
import {ReactElement} from 'react';
import {
    CV,
    Job,
} from '../cv.ts';
import {Inline} from '../components/markup.tsx';

function JobSummary({job}: { job: Job }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3>{job.role}</h3>
                    <div className="company">{job.company}</div>
                    <div className="date">{job.dates} / {job.location}</div>
                    <ul>
                        {job.summary.map((item, index) => <li key={index}><Inline content={item}/></li>)}
                    </ul>
                </div>
            </>
    );
}

/**
 * This is the root "interactive CV" route content.
 */
export default function Index(): ReactElement {
    const {
        contact,
        experience,
        education,
        interests,
        skills,
    } = useLoaderData() as CV;

    return (
            <div id="cv">
                <div id="heading">
                    <h1>{contact.name}</h1>
                    <div>{contact.title}</div>
                </div>
                <div id="content">
                    <div id="sidebar">
                        <div id="contact">
                            <h2>Contact</h2>
                            <ul>
                                {contact.links.map((link) => (
                                        <li key={link.href}>
                                            <a href={link.href}><Inline content={link.text}/></a>
                                        </li>
                                ))}
                            </ul>
                        </div>
                        <div id="skills">
                            <h2>Skills</h2>
                            <ul>
                                {skills?.map((skill, index) => <li key={index}>{skill}</li>)}
                            </ul>
                        </div>
                        <div id="education">
                            <h2>Education</h2>
                            {education.map((e, index) => (
                                    <div key={index}>
                                        <h3>{e.title}</h3>
                                        <div>{e.subtitle}</div>
                                        <div>{e.institution}</div>
                                        <div>{e.location}</div>
                                        <div>{e.dates}</div>
                                    </div>
                            ))}
                        </div>
                        {interests && (
                            <div id="interests">
                                <h2>Interests</h2>
                                <ul>
                                    {interests.map((interest, index) => <li key={index}>{interest}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div id="main">
                        <div id="experience">
                            <h2>Experience</h2>
                            {experience.map((job) => <JobSummary key={job.slug} job={job}/>)}
                        </div>
                    </div>
                </div>
            </div>
    );
}