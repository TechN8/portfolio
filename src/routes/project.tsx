import {ReactElement} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {formatDate, Project} from '../state/cv.ts';
import {Block, Video} from '../components/markup.tsx';

export default function ProjectDetail(): ReactElement {
    const {project, next, previous} = useLoaderData() as {
        project: Project,
        next: Project,
        previous: Project
    };
    return (
            <>
                <div id="project">
                    <div id="heading">
                        <h1>{project.title}</h1>
                        <div className="subtitle">{project?.subtitle}</div>
                        <div className="date">{formatDate(project.startDate)}{project.endDate ? ` - ${formatDate(project.endDate)}` : ''}</div>
                    </div>
                    <div id="content">
                        <div id="sidebar">
                            <div id="skills">
                                <h2>Skills</h2>
                                <ul>
                                    {project.skills?.map((s) => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        </div>
                        <div id="main">
                            {project?.video && <Video videoId={project.video}/>}
                            {project?.repo && <p><a href={project.repo} target="_blank">Source Code</a></p>}
                            {project.detail.map((d) => (
                                    <Block key={d} content={d}/>
                            ))}
                        </div>
                    </div>
                </div>
                        <nav className="bottom">
                            <ul>
                                <li>{previous && <Link to={`/projects/${previous.slug}`}>&larr;&nbsp;{previous.title}</Link>}</li>
                                <li>{next && <Link to={`/projects/${next.slug}`}>{next.title}&nbsp;&rarr;</Link>}</li>
                            </ul>
                        </nav>
            </>
    );
}