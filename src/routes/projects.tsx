import {ReactElement} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {Project} from '../cv.ts';

function ProjectLink({project}: { project: Project }): ReactElement {
    return (
            <div>
                <Link to={`/projects/${project.slug}`}>{project.title}</Link>
            </div>
    );
}

export default function Projects(): ReactElement {
    const {projects, skills} = useLoaderData() as { projects: Project[], skills: string[] };
    return (
            <>
                <h1>Portfolio</h1>
                <div id="main">
                    <div id="sidebar">
                        {skills.map((s) => (
                                <div key={s}>{s}</div>
                        ))}
                    </div>
                    <div id="content">
                        {projects.map(p => <ProjectLink key={p.slug} project={p}/>)}
                    </div>
                </div>
            </>
    );
}