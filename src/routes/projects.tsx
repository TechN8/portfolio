import {ReactElement, useCallback, useContext} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {compareDates, CV, formatDate, Project} from '../state/cv.ts';
import {Inline} from '../components/markup.tsx';
import {FilterContext, FilterDispatchContext} from '../state/reducers.ts';

function ProjectSummary({project}: { project: Project }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3>
                        <Link to={`${project.slug}`}
                        >{project.title}{project.subtitle ? ` - ${project.subtitle}` : ''}</Link>
                    </h3>
                    <div className="date">{formatDate(project.startDate)}{project.endDate ? ` - ${formatDate(project.endDate)}` : ''}</div>
                    <ul>
                        {project.summary.map((item, index) => <li key={index}><Inline content={item}/></li>)}
                    </ul>
                </div>
            </>
    );
}

export default function Projects(): ReactElement {
    const {contact, projects, skills} = useLoaderData() as CV;
    const dispatch = useContext(FilterDispatchContext);
    const state = useContext(FilterContext);

    function toggleSkill(skill: string) {
        dispatch({type: 'toggle', skill});
    }

    function resetFilters() {
        dispatch({type: 'clear'});
    }

    function sort(direction: number) {
        dispatch({type: 'sort', direction});
    }

    const filterProjects = useCallback((p: Project) => {
        return !state.filters.length || p.skills.some((s: string) => state.filters.includes(s));
    }, [state]);

    const compareProjects = useCallback((p1: Project, p2: Project) => {
        return compareDates(p1.startDate, p2.startDate) * state.direction;
    }, [state]);

    return (
            <div id="projects">
                <div id="heading">
                    <h1>Portfolio</h1>
                    <div className="subtitle">{contact.name}</div>
                </div>

                <div id="content">
                    <div id="sidebar">
                        <div id="skills-filter">
                            <h2>Filter by skills</h2>
                            <button onClick={resetFilters} disabled={!state.filters.length}>Clear Filters</button>
                            <ul>
                                {skills?.map((s) => (
                                        <li key={s}><label><input type="checkbox"
                                                                  checked={state.filters.includes(s)}
                                                                  onChange={() => toggleSkill(s)}
                                        />{s}</label></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div id="main">
                        <h2>Projects</h2>
                        <button
                                disabled={state.direction > 0}
                                onClick={() => sort(1)}
                        >Sort Ascending</button>
                        <button
                                disabled={state.direction < 0}
                                className={state.direction < 0 ? 'active' : ''}
                                onClick={() => sort(-1)}
                        >Sort Descending</button>
                        {
                            projects
                                    .filter(filterProjects)
                                    .sort(compareProjects)
                                    .map(p => <ProjectSummary key={p.slug} project={p}/>)
                        }
                    </div>
                </div>
            </div>
    );
}