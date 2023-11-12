import {ReactElement, useReducer} from 'react';
import {createHashRouter, RouterProvider} from 'react-router-dom';
import routes from './routes/routes.tsx';
import {FilterDispatchContext, FilterContext, filterReducer} from './state/reducers.ts';

export default function App(): ReactElement {
    const [filters, dispatch] = useReducer(filterReducer, {filters: [], direction: -1, collapsed: true});
    const router = createHashRouter(routes);

    return (
            <FilterContext.Provider value={filters}>
                <FilterDispatchContext.Provider value={dispatch}>
                    <RouterProvider router={router}/>
                </FilterDispatchContext.Provider>
            </FilterContext.Provider>
    );
}
