// Example 1: Duplicate validation functions with slight variations
// These functions are very similar and could be extracted into a shared utility

export function validateUserEmail(email: string): boolean {
    if (!email) {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    const parts = email.split('@');
    if (parts.length !== 2) {
        return false;
    }
    
    return true;
}

export function validateAdminEmail(email: string): boolean {
    if (!email) {
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    const parts = email.split('@');
    if (parts.length !== 2) {
        return false;
    }
    
    // Extra check for admin domain
    if (!email.endsWith('@admin.com')) {
        return false;
    }
    
    return true;
}

export function checkEmailFormat(email: string): boolean {
    if (!email) {
        return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        return false;
    }
    
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
        return false;
    }
    
    return true;
}

// Example 2: Similar data fetching functions
export async function fetchUserData(userId: string) {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    
    const data = await response.json();
    return data;
}

export async function getUserInfo(userId: string) {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    
    const result = await response.json();
    return result;
}

export async function loadUserProfile(userId: string) {
    const res = await fetch(`/api/users/${userId}`);
    
    if (!res.ok) {
        throw new Error('User not found');
    }
    
    const user = await res.json();
    return user;
}

// Example 3: Similar array processing functions
export function filterActiveUsers(users: any[]) {
    const active = [];
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === 'active') {
            active.push(users[i]);
        }
    }
    
    return active;
}

export function getActiveMembers(members: any[]) {
    const activeList = [];
    
    for (let i = 0; i < members.length; i++) {
        if (members[i].status === 'active') {
            activeList.push(members[i]);
        }
    }
    
    return activeList;
}

// Example 4: Duplicate string formatting
export function formatUserName(firstName: string, lastName: string): string {
    if (!firstName || !lastName) {
        return '';
    }
    
    const first = firstName.trim();
    const last = lastName.trim();
    
    return `${first} ${last}`;
}

export function createFullName(firstName: string, lastName: string): string {
    if (!firstName || !lastName) {
        return '';
    }
    
    const fname = firstName.trim();
    const lname = lastName.trim();
    
    return `${fname} ${lname}`;
}

export function getUserDisplayName(firstName: string, lastName: string): string {
    if (!firstName || !lastName) {
        return 'Unknown';
    }
    
    const f = firstName.trim();
    const l = lastName.trim();
    
    return `${f} ${l}`;
}
