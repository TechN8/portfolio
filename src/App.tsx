import {FilterContext, FilterDispatchContext, filterReducer} from './cv.ts';
import {ReactElement, useReducer} from 'react';

export default function App({children}: {children: ReactElement}): ReactElement {
    const [filters, dispatch] = useReducer(filterReducer, [])

    return (
            <FilterContext.Provider value={filters}>
                <FilterDispatchContext.Provider value={dispatch}>
                    {children}
                </FilterDispatchContext.Provider>
            </FilterContext.Provider>
    )
}