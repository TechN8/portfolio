import {ReactElement} from "react";
import {useLoaderData} from 'react-router-dom';
import {Project} from '../cv.ts';

export default function ProjectDetail(): ReactElement {
    const {project} = useLoaderData() as { project: Project };
    return (
        <>
            PROJECT DETAIL
            {project.slug}
        </>
    )
}