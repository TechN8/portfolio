import {ReactElement, useContext} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {FilterContext, FilterDispatchContext, Project} from '../cv.ts';

function ProjectSummary({project}: { project: Project }): ReactElement {
    return (
            <>
                <div className="job">
                    <h3><Link to={`${project.slug}`}>{project.title}</Link></h3>
                    <div className="date">{project.dates}</div>
                    {/*<ul>*/}
                    {/*    {project.summary.map((item) => <li key={item}>{item}</li>)}*/}
                    {/*</ul>*/}
                </div>
            </>
    );
}

export default function Projects(): ReactElement {
    const {projects, skills} = useLoaderData() as { projects: Project[], skills: string[] };
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
                </div>

                <div id="content">
                    <div id="sidebar">
                        <h2>Filter by skills</h2>
                        <button onClick={resetFilters}>Deselect All</button>
                        <ul>
                            {skills.map((s) => (
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