function roleMiddleware(rolesArray) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "admin role required",
      });
    }

    if (req.user.roles) {
      const hasRole = req.user.roles.some((item) => rolesArray.includes(item));
      if (hasRole) {
        return next();
      } else {
        return res.status(401).json({
          success: false,
          message: "you do not have the role",
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  };
}

export default roleMiddleware;
