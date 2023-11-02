import {
    Link,
    useLoaderData,
} from 'react-router-dom';
import {ReactElement} from 'react';
import {
    CV,
    Job,
    Project,
} from '../cv.ts';
import {Inline} from '../components/markup.tsx';

function JobSummary({job}: { job: Job }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3><Link to={`jobs/${job.slug}`}>{job.role}</Link></h3>
                    <div className="company">{job.company}</div>
                    <div className="date">{job.dates}</div>
                    <ul>
                        {job.summary.map((item, index) => <li key={index}><Inline content={item}/></li>)}
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
                        {project.summary.map((item, index) => <li key={index}><Inline content={item}/></li>)}
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
        projects,
        experience,
        education,
        interests,
        skills,
    } = useLoaderData() as CV;

    return (
            <>
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
                            {education.map(e => (
                                    <p>
                                        <h3>{e.title}</h3>
                                        <div>{e.subtitle}</div>
                                        <div>{e.institution}</div>
                                        <div>{e.location}</div>
                                        <div>{e.dates}</div>
                                    </p>
                            ))}
                        </div>
                        <div id="interests">
                            <h2>Interests</h2>
                            <ul>
                                {interests.map(i => <li>{i}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div id="main">
                        <div id="experience">
                            <h2>Experience</h2>
                            {experience.map((job) => <JobSummary key={job.slug} job={job}/>)}
                        </div>
                        <div id="projects">
                            <h2>Projects</h2>
                            {projects.map((project) => <ProjectSummary key={project.slug} project={project}/>)}
                        </div>
                    </div>
                </div>
            </>
    );
}