const MembershipChecker = ({ user, required, children }) => {
  const tierOrder = ["free", "gold", "platinum", "diamond"];
  const userIndex = tierOrder.indexOf(user.membership);
  const requiredIndex = tierOrder.indexOf(required);

  if (userIndex < requiredIndex) {
    return (
      <div className="locked-feature">
        <p>This feature requires a <strong>{required}</strong> membership 💎</p>
        <a href="/memberships" className="upgrade-btn">Upgrade Now</a>
      </div>
    );
  }

  return children;
};

export default MembershipChecker;
