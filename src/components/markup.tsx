import {ReactElement} from 'react';
import DOMPurify from 'dompurify';

const blockConfig = { ALLOWED_TAGS: ['p', 'img', 'a', 'span', '#text'], KEEP_CONTENT: false}
const inlineConfig = { ALLOWED_TAGS: ['img', 'a', 'span', '#text'], KEEP_CONTENT: false}

// Add a hook to make all links open a new window
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if ('target' in node) {
        node.setAttribute('target', '_blank');
    }
});

export function Block({content}: { content: string }): ReactElement {
    return (
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, blockConfig)}}/>
    );
}

export function Inline({content}: { content: string }): ReactElement {
    return (
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content, inlineConfig)}}/>
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