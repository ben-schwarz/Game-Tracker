// src/utils/friendCode.js

export function generateFriendCode(username) {
    const uniquePart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${username}-${uniquePart}`;
}
