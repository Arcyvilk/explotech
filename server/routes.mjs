export const login = async (req, res) => {
  console.log(req);
  res.status(200).send('logged in');
};
