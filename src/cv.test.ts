import {filterReducer, loadCV, loadJob, loadProject, loadProjects} from './cv.ts';

import testdata from './test/testdata.json';
import {expect} from 'vitest';

// @ts-ignore
fetch.mockResponse(JSON.stringify(testdata));

test('Loads CV json via fetch', async () => {
    const cv = await loadCV();
    expect(cv.contact.name).toContain('First Last');
});

test('Loads Job', async () => {
    const {job} = await loadJob({params: {slug: 'job-1'}});
    expect(job?.slug).toEqual('job-1');
});

test('Loads Project', async () => {
    const {project} = await loadProject({params: {slug: 'project-1'}});
    expect(project?.slug).toEqual('project-1');
});

test('Loads Projects and Skills', async () => {
    const {projects, skills} = await loadProjects();
    expect(projects).toHaveLength(2);
    expect(skills).toHaveLength(3);
});

test('Handles skill toggle', () => {
    let filters = ['Skill 1'];
    filters = filterReducer(filters, {type: 'toggle', skill: 'Skill 2'});
    expect(filters).length(2);
    expect(filters).includes('Skill 1');
    expect(filters).includes('Skill 2');
    filters = filterReducer(filters, {type: 'toggle', skill: 'Skill 2'});
    expect(filters).not.includes('Skill 2');
});

test('Handles skill clear', () => {
    let filters = ['Skill 1', 'Skill 2'];
    filters = filterReducer(filters, {type: 'clear'});
    expect(filters).length(0);
});