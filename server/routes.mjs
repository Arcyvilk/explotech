export const login = async (req, res) => {
  console.log(req);
  const yes = true;
  if (yes) {
    res.sendStatus(204); // No Content
  } else {
    res.sendStatus(403);
  } // Forbidden
};
