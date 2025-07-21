export const hasAccess = (user, requiredMembershipLevel) => {
    const levels = ["free", "gold", "platinum", "diamond"];
    const userLevelIndex = levels.indexOf(user.membershipLevel);
    return levels.indexOf(requiredMembershipLevel) <= userLevelIndex;
};