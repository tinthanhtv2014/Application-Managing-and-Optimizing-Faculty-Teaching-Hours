const { knn_server } = require("./testknn");

const GOI_Y_SERVER = async (req, res) => {
  try {
    let results = await knn_server();

    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      EM: "lỗi controller getAllChucvu",
      EC: -1,
      DT: [],
    });
  }
};

module.exports = { GOI_Y_SERVER };
