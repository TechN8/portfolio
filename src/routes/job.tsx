import {ReactElement} from 'react';
import {useLoaderData} from 'react-router-dom';
import {Job} from '../state/cv.ts';

export default function JobDetail(): ReactElement {
    const {job} = useLoaderData() as { job: Job };
    return (
            <>
                JOB DETAIL
                {job.slug}
            </>
    );
}