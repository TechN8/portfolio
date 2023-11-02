import {ReactElement, useContext} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {CV, FilterContext, FilterDispatchContext, Project} from '../cv.ts';

function ProjectSummary({project}: { project: Project }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3>
                        <Link to={`${project.slug}`}
                        >{project.title}{project.subtitle ? ` - ${project.subtitle}` : ''}</Link>
                    </h3>
                    <div className="date">{project.dates}</div>
                </div>
            </>
    );
}

export default function Projects(): ReactElement {
    const {contact, projects, skills} = useLoaderData() as CV;
    const dispatch = useContext(FilterDispatchContext);
    const filters = useContext(FilterContext);

    function toggleSkill(skill: string) {
        dispatch({type: 'toggle', skill});
    }

    function resetFilters() {
        dispatch({type: 'clear'});
    }

    return (
            <>
                <div id="heading">
                    <h1>Portfolio</h1>
                    <div>{contact.name}</div>
                </div>

                <div id="content">
                    <div id="sidebar">
                        <h2>Filter by skills</h2>
                        <button onClick={resetFilters}>Deselect All</button>
                        <ul>
                            {skills?.map((s) => (
                                    <li key={s}><label><input type="checkbox"
                                                              checked={filters.includes(s)}
                                                              onChange={() => toggleSkill(s)}
                                    />{s}</label></li>
                            ))}
                        </ul>
                    </div>
                    <div id="main">
                        <h2>Projects</h2>
                        {
                            projects
                                    .filter(p => !filters.length || p.skills.some(s => filters.includes(s)))
                                    .map(p => <ProjectSummary key={p.slug} project={p}/>)
                        }
                    </div>
                </div>
            </>
    );
}