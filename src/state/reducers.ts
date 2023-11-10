import {createContext} from 'react';

/** Action for reducers */
type Action = {
    type: string
}

/** Action with skill field */
interface SkillAction extends Action {
    skill: string;
}

/** Action for sorting */
interface SortAction extends Action {
    direction: number;
}

type FilterState = {
    filters: string[];
    direction: number;
}

/** React context for passing filters to children */
export const FilterContext = createContext<FilterState>({filters: [], direction: 1});

/** Dispatcher context for sending reducer actions */
export const FilterDispatchContext = createContext<Function>(() => {
});

/** Reducer for managing selected filter skills */
export function filterReducer(state: FilterState, action: Action | SkillAction | SortAction) {
    switch (action.type) {
        case 'toggle': {
            const skill = (<SkillAction>action).skill;
            let filters = state.filters;
            if (filters.includes(skill)) {
                return {
                    ...state,
                    filters: filters.filter(f => f != skill)
                };
            } else {
                return {
                    ...state,
                    filters: [...filters, skill]
                };
            }
        }
        case 'sort': {
            return {
                ...state,
                direction: (<SortAction>action).direction
            };
        }
        case 'clear': {
            return {
                ...state,
                filters: []
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}