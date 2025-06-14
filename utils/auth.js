export const hasAccess = (user, requiredLevel) => {
    const levels = ['free', 'gold', 'platinum', 'diamond'];
    return levels.indexOf(user.membership) >= levels.indexOf(requiredLevel);
};

{ hasAccess(user, 'gold') && <FlirtButton /> }
{ hasAccess(user, 'platinum') && <p>Upgrade to Platinum to unlock video profiles</p> }