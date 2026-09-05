export function authorizeModification(req, res, next) {
  const isParent = req.user?.role === "parent";
  const isSelfChild =
    req.user?.role === "child" &&
    String(req.user.id) === String(req.params.userId);


  if (isParent || isSelfChild) {
    return next();
  }

  // Block all other cases
  return res.status(403).json({ error: "Access denied" });
}