import {ReactElement} from 'react';
import {useLoaderData} from 'react-router-dom';
import {Project} from '../cv.ts';
import {Block} from '../components/markup.tsx';

export default function ProjectDetail(): ReactElement {
    const {project} = useLoaderData() as { project: Project };
    return (
            <>
                <div id="heading">
                    <h1>{project.title}</h1>
                    <div>{project?.subtitle}</div>
                </div>
                <div className="content">
                    <div className="main">
                        {project.detail.map((d) => (
                                <Block key={d} content={d}/>
                        ))}
                    </div>
                </div>
            </>
    );
}