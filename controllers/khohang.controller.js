const WareHouse = require("../models/khohang.model");

module.exports = {
  create: (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Dữ liệu không tồn tại",
      });
    }

    const wareHouse = new WareHouse({
      MaKhoHang: req.body.wareHouse.MaKhoHang,
      TenKhoHang: req.body.wareHouse.TenKhoHang,
      DiaChiKhoHang: req.body.wareHouse.DiaChiKhoHang,
      SDTKhoHang: req.body.wareHouse.SDTKhoHang,
      MaLSP: req.body.wareHouse.MaLSP,
    });
    console.log(req.body)
    WareHouse.create( wareHouse, (err, data) => {
      if (err) res.status(500).send({message: err.message || "some err"});
      else res.status(200).send(data);
    });
  },

  findOne: (req, res) => {
    WareHouse.find(req.params.MaKhoHang, (err, data) => {
      if (err) {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.MaKhoHang}.`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  },

  findAll: (req, res) => {
    WareHouse.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers.",
        });
      else res.status(200).send(data);
    });
  },

  delete: (req, res) => {
    WareHouse.delete(req.params.MaKhoHang, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving product.",
        });
      else res.status(200).send({
        message: "Success!"
      });
    });
  },
};
