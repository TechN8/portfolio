import {loadCV, loadJob, loadProject, loadProjects} from './cv.ts';

import testdata from './test/testdata.json';
import {expect} from 'vitest';

// @ts-ignore
fetch.mockResponse(JSON.stringify(testdata));

test('Loads CV json via fetch', async () => {
    const {cv} = await loadCV();
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
