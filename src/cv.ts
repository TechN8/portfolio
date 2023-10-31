export interface Job {
    slug: string,
    company: string,
    role: string,
    dates: string,
    location: string,
    summary: string[],
    detail: string[]
}

export interface Project {
    slug: string,
    title: string,
    dates: string,
    summary: string[],
    detail: string[],
    showOnResume: boolean,
}

export interface Link {
    text: string,
    href: string,
}

export interface CV {
    contact: {
        name: string,
        title: string,
        links: Link[],
    }
    education: [
        {
            title: string,
            subTitle: string,
            institution: string,
            location: string,
            dates: string,
        }
    ],
    experience: Job[],
    projects: Project[],
    timestamp: number,
}

export let cv: CV;

export async function loadCV() {
    if (!cv) {
        const response = await fetch('./data.json');
        cv = await response.json();
    }
    return {cv};
}

export async function loadJob({params}: {params: any}) {
    const { cv } = await loadCV();
    let job = cv.experience.find(j => j.slug = params.slug);
    return { job };
}

export async function loadProject({params}: {params: any}) {
    const { cv } = await loadCV();
    let project = cv.projects.find(p => p.slug = params.slug);
    return { project };
}
