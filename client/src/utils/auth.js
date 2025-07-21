export const hasAccess = (user, requiredLevel) => {
    const levels = ['free', 'gold', 'platinum', 'diamond'];
    return levels.indexOf(user.membership)>=levels.indexOf(requiredLevel);
};