import './App.css';
import {
    createHashRouter,
    RouterProvider,
} from 'react-router-dom';
import Root from './routes/root.tsx';
import ErrorPage from './error-page.tsx';
import {loadCV, loadJob, loadProject} from './cv.js';
import Index from './routes';
import Projects from './routes/projects.tsx';
import ProjectDetail from './routes/project.tsx';
import JobDetail from './routes/job.tsx';

function App() {

    const router = createHashRouter([
        {
            path: '/',
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    element: <Index/>,
                    index: true,
                    loader: loadCV,
                },
                {
                    path: 'jobs/:slug',
                    element: <JobDetail/>,
                    loader: loadJob,
                },
                {
                    path: 'projects',
                    element: <Projects/>,
                },
                {
                    loader: loadProject,
                    path: 'projects/:slug',
                    element: <ProjectDetail/>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
