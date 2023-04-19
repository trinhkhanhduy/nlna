const sql = require("./db");

const TypeProduct = function (typeProduct) {
  this.TenLSP = typeProduct.TenLSP;
};

TypeProduct.create = (newTypeProduct, result) => {
  sql.query("INSERT INTO LoaiSanPham SET ?", newTypeProduct, (err, res) => {
    if (err) {
      console.log("error" + err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null, {...newTypeProduct});
  });
};

TypeProduct.find = (MaLSP, result) => {
  sql.query(
    `SELECT * FROM LoaiSanPham WHERE MaLSP = '${MaLSP}'`,
    (err, res) => {
      if (err) {
        console.log("error" + err);
        result(null, err);
        return;
      }

      if (res.length > 0) {
        result(null, res);
      } else {
        result(null);
      }
    },
  );
};

TypeProduct.innerJoinWareHouse = (MaLSP, result) => {
  sql.query(
    `SELECT LoaiSanPham.TenLSP, KhoHang.TenKhoHang FROM LoaiSanPham INNER JOIN KhoHang ON LoaiSanPham.MaLSP = KhoHang.MaLSP WHERE LoaiSanPham.MaLSP = '${MaLSP}'`,
    (err, res) => {
      if (err) {
        console.log("error" + err);
        result(null, err);
        return;
      }

      if (res.length > 0) {
        result(null, res);
      } else {
        result(null);
      }
    },
  );
};

TypeProduct.getAll = (result) => {
  sql.query("SELECT * FROM LoaiSanPham", (err, res) => {
    if (err) {
      console.log(result);
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

TypeProduct.delete = (MaSP, result) => {
  sql.query("DELETE FROM LoaiSanPham WHERE MaLSP=?", MaSP, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Success!");
    result(null,{message:"ok"});
  });
};

module.exports = TypeProduct;
