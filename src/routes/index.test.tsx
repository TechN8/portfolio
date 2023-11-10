import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {expect, test} from 'vitest';
import Index from './index.tsx';
import {loadIndex} from '../state/cv.ts';

import testdata from '../test/testdata.json';

test('Renders index page correctly', async () => {
    // @ts-ignore
    fetch.mockResponse(() => {
        return JSON.stringify(testdata);
    });
    const router = createMemoryRouter([
        {
            path: '/',
            element: <Index/>,
            loader: loadIndex,
        }
    ], {
        initialEntries: ['/']
    });
    const {getByText} = render(
            <RouterProvider router={router}/>
    );
    await screen.findByText('First Last');
    expect(getByText('First Last')).toBeInTheDocument();
    expect(getByText('Experience')).toBeInTheDocument();
});
