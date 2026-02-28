export function requireRole(userRole: string, allowed: string[]) {
    if(!allowed.includes(userRole)) {
        throw new Error('Unauthorized');
    }
}