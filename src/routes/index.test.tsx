import {render, screen} from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router-dom';
import {expect} from 'vitest';
// import routes from './routes.tsx';
import Index from './index.tsx';
import {cv, loadCV} from '../cv.ts';

test('Renders index page correctly', async () => {
    // @ts-ignore
    fetch.mockResponse(() => {
        console.log('In mock response.');
        return JSON.stringify({
            "contact": {
                "name": "Nathan Babb",
                "title": "Software Architect | Full Stack Engineer",
                "links": [
                    {
                        "text": "linkedin.com/in/nathanbabb",
                        "href": "https://linkedin.com/in/nathanbabb"
                    },
                    {
                        "text": "github.com/TechN8",
                        "href": "https://github.com/TechN8"
                    }
                ]
            },
            "education": [
                {
                    "title": "B.S. Computer Science",
                    "subtitle": "Minor in AI",
                    "institution": "Case Western Reserve University",
                    "location": "Cleveland, OH",
                    "dates": "1994 - 1998"
                }
            ],
            "experience": [
                {
                    "slug": "avantia",
                    "company": "Avantia Inc.",
                    "role": "Application Architect",
                    "dates": "September 2012 -",
                    "location": "Valley View, OH",
                    "summary": [
                        "Worked with clients and prospects to gather requirements and design solutions.",
                        "Designed and implemented custom web applications.",
                        "Created web services to work with internal data.",
                        "Integrated external web service APIs.",
                        "Deployed applications on AWS ECS via CDK.",
                        "Developed native and cross platform mobile apps.",
                        "Lead teams of up to 7 developers per-project.",
                        "Administered CI/CD systems.",
                        "Conducted code reviews.",
                        "Wrote developer and administrator documentation.",
                        "Conducted job interviews for developers.",
                        "Tuned apps to reduce CPU usage by up to 80%."
                    ],
                    "detail": []
                },
                {
                    "slug": "lexi-comp",
                    "company": "Lexi-Comp (WK Health)",
                    "role": "Manager, Software Product Development",
                    "dates": "May 2000 - July 2012",
                    "location": "Hudson, OH",
                    "summary": [
                        "Worked with stakeholders to develop requirements and specifications.",
                        "Developed native mobile apps.",
                        "Developed and web services.",
                        "Designed MySQL DB to store content and updates.",
                        "Coded WYSIWYG XML content editor.",
                        "Managed 10 member agile development team responsible for mobile, web and data products.",
                        "IT staff grew from 5 to 20+ members."
                    ],
                    "detail": []
                },
                {
                    "slug": "ibm",
                    "company": "IBM",
                    "role": "Software Engineer",
                    "dates": "June 1998 - May 2000",
                    "location": "Poughkeepsie, NY",
                    "summary": [
                        "Performed maintenance and development for the OS/390 C/C++ run-time library and common components.",
                        "Created unit test cases to reproduce failures.",
                        "Diagnosed bugs via debugger and heap analysis.",
                        "Developed fixes using C, PL/X and Assembly."
                    ],
                    "detail": []
                }
            ],
            "projects": [
                {
                    "slug": "iot-tracer",
                    "title": "IoT Vehicle Tracker",
                    "dates": "May 2023 - ",
                    "showOnResume": true,
                    "url": false,
                    "summary": [
                        "Uses nRF9160 SOC and Zephyr RTOS",
                        "Tracks GPS position.",
                        "Reads CAN-BUS messages.",
                        "Logs to web service via LTE cellular.",
                        "Expose device with Bluetooth LE."
                    ],
                    "detail": [
                        "This project is a proof-of-concept that I'm working on for an embedded vehicle telematics solution."
                    ],
                    "skills": [
                        "C",
                        "CAN-BUS",
                        "RTOS",
                        "Embedded",
                        "LTE",
                        "Zephyr"
                    ]
                },
                {
                    "slug": "charm-quark",
                    "title": "Charm Quark - iOS Puzzle Game",
                    "dates": "July 2012 - September 2012",
                    "showOnResume": true,
                    "url": "https://github.com/TechN8/CharmQuark",
                    "summary": [
                        "Designed and coded iOS puzzle game.",
                        "Created all artwork and music.",
                        "Incorporated Aether Theory LLC.",
                        "Created Website in Python.",
                        "Hosted site on Google Cloud Platform.",
                        "Published application to Apple App Store."
                    ],
                    "detail": [
                        "This is an iOS game I developed between leaving Lexi-Comp and joining Avantia."
                    ],
                    "skills": [
                        "CSS",
                        "GCP",
                        "HTML",
                        "Objective-C",
                        "Python",
                        "SVG"
                    ]
                }
            ],
            "interests": [
                "Electric Vehicles",
                "Gaming",
                "Gardening",
                "Hiking",
                "Running",
                "Travel"
            ]
        });
    });
    const router = createMemoryRouter([
        {
            path: '/',
            element: <Index/>,
            loader: loadCV,
        }
    ], {
        initialEntries: ['/']
    });
    const {getByText} = render(
            <RouterProvider router={router}/>
    );
    console.log(cv);
    await screen.findByText('Nathan Babb')
    expect(getByText('Nathan Babb')).toBeInTheDocument();
    expect(getByText('Experience')).toBeInTheDocument();
})
;
;