import ErrorPage from '../error-page.tsx';
import {loadCV, loadIndex, loadJob, loadProject, loadProjects} from '../state/cv.ts';
import JobDetail from './job.tsx';
import Projects from './projects.tsx';
import ProjectDetail from './project.tsx';
import Index from './index.tsx';
import Root from './root.tsx';

export default [
    {
        basename: '/react-ts-portfolio',
        path: '/',
        element: <Root/>,
        errorElement: <ErrorPage/>,
        loader: loadCV,
        children: [
            {
                element: <Index/>,
                index: true,
                loader: loadIndex,
            },
            {
                path: 'jobs/:slug',
                element: <JobDetail/>,
                loader: loadJob,
            },
            {
                path: 'projects',
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