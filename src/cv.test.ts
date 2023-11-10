import {formatDate, loadCV, loadJob, loadProject, loadProjects} from './state/cv.ts';

import testdata from './test/testdata.json';
import {expect} from 'vitest';
import {filterReducer} from './state/reducers.ts';

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
    let state = {filters: ['Skill 1'], direction: -1, collapsed: false};
    state = filterReducer(state, {type: 'toggle', skill: 'Skill 2'});
    expect(state.filters).length(2);
    expect(state.filters).includes('Skill 1');
    expect(state.filters).includes('Skill 2');
    state = filterReducer(state, {type: 'toggle', skill: 'Skill 2'});
    expect(state.filters).not.includes('Skill 2');
});

test('Handles skill clear', () => {
    let state = {filters: ['Skill 1', 'Skill 2'], direction: -1, collapsed: false};
    state = filterReducer(state, {type: 'clear'});
    expect(state.filters).length(0);
});

test('Handles sort', () => {
    let state = {filters: ['Skill 1', 'Skill 2'], direction: -1, collapsed: false};
    state = filterReducer(state, {type: 'sort', direction: 1});
    expect(state.direction).toBe(1);
});

test('Parses dates', () => {
    const job = testdata.experience[0];
    expect(formatDate(job.startDate)).toBe('January 2020');
    expect(formatDate(job.endDate)).toBe('October 2020');
});
