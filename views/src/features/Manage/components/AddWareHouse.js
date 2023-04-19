import React, { useEffect, useState } from "react";
import "./addProductForm.css";
import "./addWareHouse.css";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import productTypeAPI from "../../../api/productTypeAPI";
import wareHouseApi from "../../../api/warehouseAPi";

const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const schema = yup.object({
  khohang: yup.string().required("Tên Kho hàng không được trống"),
  diachi: yup.string().required("Tên địa chỉ không được trống"),
  loaisanpham: yup.string().required("Vui lòng chọn loại sản phẩm"),

  sdt: yup.string().matches(regex, "Nhập đúng kiểu số điện thoại"),
});

function AddWareHouse(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [dataType, setDataType] = React.useState([]);
  useEffect(async () => {
    const a = await productTypeAPI.getAllTypeProduct();
    setDataType(a);
  }, []);

  const dataWareHouse = (data) => {
    return {
      MaKhoHang: "",
      TenKhoHang: data.khohang,
      DiaChiKhoHang: data.diachi,
      SDTKhoHang: data.sdt,
      MaLSP: data.loaisanpham,
    };
  };
  const onSubmit = async (data) => {
    const b = await wareHouseApi.createWareHouse(dataWareHouse(data));
    if (b) {
      alert("Nhập kho thành công!");
      window.location.reload();
    }
    // if (!data) return;
    // try {
    //   await productAPI.create(dataProduct(data));
    //   await importIncoiceAPI.create(dataInvoice(data));
    //   if (file) {
    //     await imageAPI.create(dataImage(data));
    //   }
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
  };

  return (
    <div className="container">
      <div></div>
      <div className="product_add">
        <h2>THÊM KHO HÀNG</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <div className="title">
                <label>Tên Kho Hàng</label>
              </div>
              <div className="inputField">
                <input className="khohang" {...register("khohang")} />
                <span className="errors">{errors.khohang?.message}</span>
              </div>
            </div>

            <div className="field">
              <div className="title">
                <label>Địa chỉ</label>
              </div>
              <div className="inputField">
                <input className="masanpham" {...register("diachi")} />
                <span className="errors">{errors.diachi?.message}</span>
              </div>
            </div>

            <div className="field">
              <div className="title">
                <label>Số điện thoại</label>
              </div>
              <div className="inputField">
                <input
                  className="masanpham"
                  {...register("sdt")}
                  maxLength={10}
                />
                <span className="errors">{errors.sdt?.message}</span>
              </div>
            </div>

            <div className="field">
              <div className="title">
                <label>Loại Sản Phẩm</label>
              </div>
              <div className="inputField">
                <select className="loaisanpham" {...register("loaisanpham")}>
                  <option value="">...</option>
                  {dataType.map((item, index) => {
                    return (
                      <option key={index} value={item.MaLSP}>
                        {item.TenLSP}
                      </option>
                    );
                  })}
                </select>
                <span className="errors">{errors.loaisanpham?.message}</span>
              </div>
            </div>

            <div className="field">
              <div></div>
              <div className="inputField">
                <button type="submit">THÊM</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddWareHouse;
