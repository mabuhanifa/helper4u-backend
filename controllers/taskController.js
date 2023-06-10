const getTasks = async (req, res) => {
  const selectDataQuery = `SELECT * FROM task`;
  db.query(selectDataQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving data:", err);
      return;
    }
    res.send(results);
  });
};

module.exports = { getTasks };
