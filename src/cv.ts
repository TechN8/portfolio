import {createContext} from 'react';

/* Types */

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
    repo?: string,
    subtitle?: string;
    dates: string,
    summary: string[],
    detail: string[],
    showOnResume: boolean,
    skills: string[],
    video?: string,
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
    hideSkills: string[],
    skills?: string[],
}

/** Action for reducers */
type Action = {
    type: string
}

/** Action with skill field */
interface SkillAction extends Action {
    skill: string;
}

let cv: CV;

/** React context for passing filters to children */
export const FilterContext = createContext<string[]>([]);

/** Dispatcher context for sending reducer actions */
export const FilterDispatchContext = createContext<Function>(() => {
});

/** Reducer for managing selected filter skills */
export function filterReducer(filters: string[], action: Action | SkillAction) {
    switch (action.type) {
        case 'toggle': {
            const skill = (<SkillAction>action).skill;
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

/** Case-insensitive sort function. */
function skillSort(a: string, b: string) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}

/** Make a unique set of skills from all projects in CV */
function skillSet(cv: CV): Set<string> {
    const skillSet = new Set<string>();
    cv.projects.forEach((p) => {
        p.skills.forEach((s) => skillSet.add(s));
    });
    return skillSet;
}

/** Sorted array of all skills from a CV */
function allSkills(cv: CV): string[] {
    return Array.from(skillSet(cv)).sort(skillSort);
}

/** All skills minus hidden skills. */
function indexSkills(cv: CV): string[] {
    const set = skillSet(cv);
    cv.hideSkills.forEach(s => set.delete(s));
    return Array.from(set).sort(skillSort);
}

/** Cetch CV data from server if not already downloaded. */
export async function loadCV() {
    if (!cv) {
        const response = await fetch(`${document.baseURI}/data.json`);
        cv = await response.json();
    }
    return cv;
}

/** React-Router loader for index page */
export async function loadIndex() {
    const cv = await loadCV();
    const resumeProjects = cv.projects.filter(p => p.showOnResume);
    return {
        ...cv,
        projects: resumeProjects,
        skills: indexSkills(cv),
    };
}

/**
 * React-Router loader for job page
 *  @deprecated
 *  */
export async function loadJob({params}: { params: any }) {
    const cv = await loadCV();
    let job = cv.experience.find(j => j.slug == params.slug);
    return {job};
}

/** React-Router loader for project page. */
export async function loadProject({params}: { params: any }) {
    const cv = await loadCV();
    let index = cv.projects.findIndex(p => p.slug == params.slug);
    let project = cv.projects[index];
    let previous = index > 0 ? cv.projects[index - 1] : false;
    let next = index < cv.projects.length - 1 ? cv.projects[index + 1] : false;
    return {
        project: {
            ...project,
            skills: project?.skills.sort(skillSort),
        },
        next,
        previous,
    };
}

/** React-Router loader for projects search page. */
export async function loadProjects() {
    const cv = await loadCV();
    return {
        ...cv,
        skills: allSkills(cv)
    };
}