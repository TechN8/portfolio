import {createContext} from 'react';

export type Job = {
    slug: string,
    company: string,
    role: string,
    dates: string,
    location: string,
    summary: string[],
    detail: string[]
}

export type Project = {
    slug: string,
    title: string,
    subtitle?: string;
    dates: string,
    summary: string[],
    detail: string[],
    showOnResume: boolean,
    skills: string[],
}

export type Link = {
    text: string,
    href: string,
}

export type Contact = {
    name: string,
    title: string,
    links: Link[],
}

export type CV = {
    contact: Contact,
    education: [
        {
            title: string,
            subtitle: string,
            institution: string,
            location: string,
            dates: string,
        }
    ],
    experience: Job[],
    projects: Project[],
    interests: string[],
    skills?: string[],
}

let cv: CV;

export const FilterContext = createContext<string[]>([]);
export const FilterDispatchContext = createContext<Function>(()=>{})

export function filterReducer(filters: string[], action: { type: string, skill: string }) {
    switch (action.type) {
        case 'toggle': {
            const skill = action.skill;
            if (filters.includes(skill)) {
                return filters.filter(f => f != skill);
            } else {
                return [...filters, skill];
            }
        }
        case 'clear': {
            return [];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function skills(cv: CV): string[] {
    const skillSet = new Set<string>();
    cv.projects.forEach((p) => {
        p.skills.forEach((s) => skillSet.add(s));
    });
    return Array.from(skillSet).sort();
}

export async function loadCV() {
    if (!cv) {
        const response = await fetch('./data.json');
        cv = await response.json();
    }
    return {cv};
}

export async function loadIndex() {
    const {cv} = await loadCV();
    const resumeProjects = cv.projects.filter(p => p.showOnResume);
    return {
        ...cv,
        projects: resumeProjects,
        skills: skills(cv),
    };
}

export async function loadJob({params}: { params: any }) {
    const {cv} = await loadCV();
    let job = cv.experience.find(j => j.slug == params.slug);
    return {job};
}

export async function loadProject({params}: { params: any }) {
    const {cv} = await loadCV();
    let project = cv.projects.find(p => p.slug == params.slug);
    return {project};
}

export async function loadProjects() {
    const {cv} = await loadCV();
    return {
        ...cv,
        skills: skills(cv)
    };
}