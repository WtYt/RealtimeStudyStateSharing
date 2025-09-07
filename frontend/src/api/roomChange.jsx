import { enterRoom as demoEnter, leaveRoom as demoLeave, leaveCurrentRoom as demoLeaveCurrent, getCurrentRoomId } from './demoBackend';

export async function enterRoom(roomId, { user } = {}) {
    return demoEnter(roomId, { user });
}

export async function leaveRoom(roomId, { user } = {}) {
    return demoLeave(roomId, { user });
}

export async function leaveCurrentRoom({ user } = {}) {
    return demoLeaveCurrent({ user });
}

export async function getCurrentRoomIdApi() {
    return getCurrentRoomId();
}
