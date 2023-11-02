import {ReactElement} from 'react';
import DOMPurify from 'dompurify';

export function Block({content}: { content: string }): ReactElement {
    return (
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
    );
}

export function Inline({content}: { content: string }): ReactElement {
    return (
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
    );
}

export function Video({videoId}: { videoId: string }): ReactElement {
    return (
            <div className="video">
                <iframe
                        className="youtube"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                ></iframe>
            </div>
    );
}