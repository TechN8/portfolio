import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {expect, test} from 'vitest';
// import routes from './routes.tsx';
import Index from './index.tsx';
import {cv, loadCV} from '../cv.ts';

import testdata from '../test/testdata.json';

test('Renders index page correctly', async () => {
    // @ts-ignore
    fetch.mockResponse(() => {
        console.log('In mock response.');
        return JSON.stringify(testdata);
    });
    const router = createMemoryRouter([
        {
            path: '/',
            element: <Index/>,
            loader: loadCV,
        }
    ], {
        initialEntries: ['/']
    });
    const {getByText} = render(
            <RouterProvider router={router}/>
    );
    console.log(cv);
    await screen.findByText('First Last');
    expect(getByText('First Last')).toBeInTheDocument();
    expect(getByText('Experience')).toBeInTheDocument();
})
;
;