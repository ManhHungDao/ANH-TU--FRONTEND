import { cloneElement } from "react";
import { connect } from "react-redux";

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

export const PermissionsGate = ({
  children,
  // scopes = [],
  // userInfo,
}) => {
  // if (userInfo.roleId === "R2" || userInfo.roleId === "R4") {
  //   const data = localStorage.getItem("permissions");
  //   const permissions = JSON.parse(data);
  //   const permissionGranted = hasPermission({ permissions, scopes });

  //   if (!permissionGranted) return <></>;

  //   return <>{children}</>;
  // }
  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  permissions: state.user.accountPermission,
  userInfo: state.user.userInfo,
});

export default connect(mapStateToProps)(PermissionsGate);
