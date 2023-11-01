import {ReactElement, useCallback, useState} from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import {Project} from '../cv.ts';

function ProjectLink({project}: { project: Project }): ReactElement {
    return (
            <div>
                <Link to={`/projects/${project.slug}`}>{project.title}</Link>
            </div>
    );
}

export default function Projects(): ReactElement {
    const {projects, skills} = useLoaderData() as { projects: Project[], skills: string[] };
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const toggleSkill = useCallback((skill: string) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s != skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
        console.log(selectedSkills);
    }, [selectedSkills, setSelectedSkills]);
    return (
            <>
                <h1>Portfolio</h1>
                <div id="main">
                    <div id="sidebar">
                        <div>Filter by skills</div>
                        {skills.map((s) => (
                                <div><label key={s}><input type="checkbox"
                                                      checked={selectedSkills.includes(s)}
                                                      onChange={() => toggleSkill(s)}
                                />{s}</label></div>
                        ))}
                    </div>
                    <div id="content">
                        {
                            projects
                                    .filter(p => !selectedSkills.length || p.skills.some(s => selectedSkills.includes(s)))
                                    .map(p => <ProjectLink key={p.slug} project={p}/>)
                        }
                    </div>
                </div>
            </>
    );
}