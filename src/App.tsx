import {FilterContext, FilterDispatchContext, filterReducer} from './cv.ts';
import {ReactElement, useReducer} from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import routes from './routes/routes.tsx';

const router = createHashRouter(routes);

export default function App(): ReactElement {
    const [filters, dispatch] = useReducer(filterReducer, []);

    return (
            <FilterContext.Provider value={filters}>
                <FilterDispatchContext.Provider value={dispatch}>
                    <RouterProvider router={router}/>
                </FilterDispatchContext.Provider>
            </FilterContext.Provider>
    );
}