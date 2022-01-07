export const trending = (req, res) => res.send("Home");
export const see = (req, res) => {
  console.log(req.params);
  return res.send("Watch");
};
export const edit = (req, res) => res.send("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => {
  console.log(req.params);
  return res.send("Uplooad");
};
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete");
};
