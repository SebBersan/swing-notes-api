export function createUserModel({ username, hashedPassword }) {
    return {
        username,
        password: hashedPassword,
        createdAt: new Date(),
    };
}