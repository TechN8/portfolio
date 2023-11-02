import {ReactElement} from 'react';
import {useLoaderData} from 'react-router-dom';
import {Project} from '../cv.ts';
import {Block, Video} from '../components/markup.tsx';

export default function ProjectDetail(): ReactElement {
    const {project} = useLoaderData() as { project: Project };
    return (
            <>
                <div id="heading">
                    <h1>{project.title}</h1>
                    <div>{project?.subtitle}</div>
                </div>
                <div id="content">
                    <div id="main">
                        {project?.video && <Video videoId={project.video}/> }
                        {project?.repo && <p><a href={project.repo}>Source Code</a></p>}
                        {project.detail.map((d) => (
                                <Block key={d} content={d}/>
                        ))}
                    </div>
                </div>
            </>
    );
}