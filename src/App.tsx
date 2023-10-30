import './App.css';
import {
    createHashRouter,
    RouterProvider,
} from 'react-router-dom';
import Root from './routes/root.tsx';
import ErrorPage from './error-page.tsx';
import {loadCV} from './cv.js';

function App() {

    const router = createHashRouter([
        {
            path: '/',
            element: <Root/>,
            errorElement: <ErrorPage/>,
            loader: loadCV,
            children: [
                // {
                //     path: 'about',
                //     element: <About/>,
                // },
                // {
                //     path: 'experience',
                //     element: <Experience/>,
                // },
                // {
                //     path: 'experience/:slug',
                //     element: <Job/>,
                // },
                // {
                //     path: 'projects',
                //     element: <Projects/>,
                // },
                // {
                //     path: 'projects/:slug',
                //     element: <Project/>,
                // },
            ],
        },
    ]);

    return <RouterProvider router={router}/>;
}

export default App;
