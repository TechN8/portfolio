import localforage from "localforage";

interface Link {
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
            "dates": string,
        }
    ]
}

export async function loadCV() {
    let cv: CV | null;
    cv = await localforage.getItem("cv");
    if (!cv?.contact) {
        const response = await fetch("./cv.json");
        cv = await response.json()
        cv = await localforage.setItem("cv", cv);
    }
    return {cv};
}
