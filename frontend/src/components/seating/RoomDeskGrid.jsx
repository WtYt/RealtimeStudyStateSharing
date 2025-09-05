import React from 'react';
import DeskNoteCard from './DeskNoteCard';
import './RoomDeskGrid.css';

/**
 * props:
 * - members: Array<{ id:string, name:string, status:0|1|2, comment?:string }>
 */
export default function RoomDeskGrid({ members = [] }) {
    return (
        <div className="room-grid">
            {members.map((m, i) => (
                <DeskNoteCard
                    key={m.id || i}
                    name={m.name}
                    status={m.status}
                    comment={m.comment}
                    colorSeed={i}
                />
            ))}
        </div>
    );
}
