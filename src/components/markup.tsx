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
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        style={{border: 0, maxWidth: 560, aspectRatio: 16/9, width: "100%" }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                ></iframe>
            </div>
    );
}