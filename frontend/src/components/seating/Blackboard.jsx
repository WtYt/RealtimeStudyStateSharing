import React from 'react';
import './Blackboard.css';

/**
 * 黒板帯（ヘッダー代わり）
 * props:
 * - title?: string
 * - subtitle?: string
 * - left?: ReactNode
 * - right?: ReactNode
 */
export default function Blackboard({
    title = 'Web自習室（仮）',
    subtitle = 'みんなで一緒に勉強しよう！',
    left = null,
    right = null,
}) {
    return (
        <div className="bb-strip" role="region" aria-label="黒板">
            <div className="bb-inner">
                <div className="bb-left">{left}</div>
                <div className="bb-center">
                    <div className="bb-title" aria-live="polite">{title}</div>
                    {subtitle ? <div className="bb-subtitle">{subtitle}</div> : null}
                </div>
                <div className="bb-right">{right}</div>
            </div>
        </div>
    );
}
