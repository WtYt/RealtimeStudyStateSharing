import React, { useMemo } from 'react';
import './DeskNoteCard.css';

export default function DeskNoteCard({ name, status, comment, colorSeed = 0 }) {
    const statusMeta = (v) => {
        switch (v) {
            case 2: return { label: '取り組み中', color: '#2e7d32' };
            case 1: return { label: '離席中', color: '#ed6c02' };
            default: return { label: 'オフライン', color: '#757575' };
        }
    };
    const st = statusMeta(status);

    // ノートの配色（シードから安定生成）<- gptありがとう
    const theme = useMemo(() => {
        const hue = (colorSeed * 47) % 360;
        return {
            spine: `hsl(${hue} 70% 45%)`,
            coverBg: `hsl(${hue} 85% 96%)`,
            lines: `hsl(${hue} 40% 80%)`,
            title: `hsl(${hue} 55% 35%)`,
            label: `hsl(${hue} 25% 30%)`,
        };
    }, [colorSeed]);

    return (
        <div className="desk-card">
            {/* 机の板 */}
            <div className="desk-surface" />

            {/* ノート */}
            <div className="campus-note" style={{ background: theme.coverBg }}>
                {/* 左の背表紙帯 */}
                <div className="campus-spine" style={{ background: theme.spine }} />

                {/* 表紙本文 */}
                <div className="campus-body">
                    {/* ヘッダー：タイトルにユーザー名を表示 */}
                    <div className="campus-header">
                        <div className="campus-title" style={{ color: theme.title }} title={name}>
                            {name || 'No Name'}
                        </div>
                        <div className="campus-status">
                            <span className="dot" style={{ background: st.color }} />
                            <span>{st.label}</span>
                        </div>
                    </div>

                    {/* 横罫（薄いライン）＋ 中央に勉強内容を表示 */}
                    <div className="campus-rules">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="rule-line" style={{ borderColor: theme.lines }} />
                        ))}
                        <div className="campus-subject" title={comment || ''}>
                            {comment || '（勉強内容なし）'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
