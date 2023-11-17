import ErrorPage from '../error-page.tsx';
import {loadCV, loadIndex, loadJob, loadProject, loadProjects} from '../state/cv.ts';
import JobDetail from './job.tsx';
import Projects from './projects.tsx';
import ProjectDetail from './project.tsx';
import Resume from './resume.tsx';
import Root from './root.tsx';

export default [
    {
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPage/>,
        loader: loadCV,
        children: [
            {
                path: 'resume',
                element: <Resume/>,
                loader: loadIndex,
            },
            {
                path: 'jobs/:slug',
                element: <JobDetail/>,
                loader: loadJob,
            },
            {
                index: true,
                element: <Projects/>,
                loader: loadProjects,
            },
            {
                loader: loadProject,
                path: 'projects/:slug',
                element: <ProjectDetail/>,
            },
        ],
    },
]