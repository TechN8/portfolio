import {
    Link,
    useLoaderData,
} from 'react-router-dom';
import {ReactElement} from 'react';
import {
    CV,
    Job, Project,
} from '../cv.ts';

function Heading({cv}: { cv: CV }) {
    const {contact} = cv;

    return (
            <div id="heading">
                <h1>{contact.name}</h1>
                <div>{contact.title}</div>
            </div>
    );
}

function JobSummary({job}: { job: Job }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3><Link to={`jobs/${job.slug}`}>{job.role}</Link></h3>
                    <div className="company">{job.company}</div>
                    <div className="date">{job.dates}</div>
                    <ul>
                        {job.summary.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </>
    );
}

function ProjectSummary({project}: { project: Project }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3><Link to={`projects/${project.slug}`}>{project.title}</Link></h3>
                    <div className="date">{project.dates}</div>
                    <ul>
                        {project.summary.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            </>
    );
}

/**
 * This is the root "interactive CV" route content.
 */
export default function Index(): ReactElement {
    const {cv} = useLoaderData() as { cv: CV };

    // @ts-ignore
    return (
            <>
                <Heading cv={cv}/>
                <div id="main">
                    <div id="sidebar">
                        <div id="contact">
                            <h2>Contact</h2>
                            <ul>
                                {cv.contact.links.map((link) => (
                                        <li key={link.href}>
                                            <a href={link.href}>{link.text}</a>
                                        </li>
                                ))}
                            </ul>
                        </div>
                        <div id="skills"><h2>Skills</h2></div>
                        <div id="education"><h2>Education</h2></div>
                        <div id="interests"><h2>Interests</h2></div>
                    </div>
                    <div id="content">
                        <div id="experience">
                            <h2>Experience</h2>
                            {cv.experience.map((job) => <JobSummary key={job.slug} job={job}/>)}
                        </div>
                        <div id="projects">
                            <h2>Projects</h2>
                            {cv.projects
                                    .filter(p => p.showOnResume)
                                    .map((project) => <ProjectSummary key={project.slug} project={project}/>)}
                        </div>
                    </div>
                </div>
                {JSON.stringify(cv)}
            </>
    );
}