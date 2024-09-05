const { knn_server, randomForest_server } = require("./testknn");

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

const GOI_Y_SERVER_rf = async (req, res) => {
  try {
    let results = await randomForest_server();

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

module.exports = { GOI_Y_SERVER, GOI_Y_SERVER_rf };
