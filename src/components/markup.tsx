import {ReactElement} from 'react';
import DOMPurify from 'dompurify';

export function Block({content}: { content: string }): ReactElement {
    return (
            <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
    );
}

export function Inline({content}: { content: string }): ReactElement {
    return (
            <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
    );
}