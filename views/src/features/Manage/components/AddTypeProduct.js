import React, { useEffect } from "react";
import "./addProductForm.css";
import "./addWareHouse.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import productTypeAPI from "../../../api/productTypeAPI";

const schema = yup.object({
  loaisp: yup.string().required("Tên loại sản phẩm không được trống"),
});

function AddTypeProduct(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [count, setCount] = React.useState(0);
  const [data, setData] = React.useState([]);
  useEffect( async()=>{
    const a = await productTypeAPI.getAllTypeProduct();
    setData(a)
  },[count])
  const onSubmit = async (data) => {
    if (!data) return;
    try {
      const a = await productTypeAPI.createTypeProduct(data.loaisp);
      if (a) {
        setCount((e) => e + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteType = async (maLsp)=>{
    const a = await productTypeAPI.deleteTypeProduct(maLsp);
    if (a) {
        setCount((e) => e + 1);
      }
  }

  return (
    <div className="container">
      <div></div>
      <div className="product_add">
        <h2>THÊM LOẠI SẢN PHẨM</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <div className="title">Tên loại sản phẩm</div>
              <div className="inputField">
                <input className="loaisp" {...register("loaisp")} />
                <span className="errors">{errors.loaisp?.message}</span>
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
        <div style={{display:"flex", gap:"20px",marginTop:"10px"}}>
            {data.map((item,index)=>{
                return(
                    <React.Fragment key={index}>
                        
                        <div style={{border:"1px solid",padding:"10px",minHeight:"50px",minWidth:"70px",textAlign:"center" ,position:"relative"}}>
                            <div style={{
                                position:"absolute",
                                top:"-6px",
                                right:"5px",
                                cursor:"pointer"
                                
                            }}
                            onClick={()=>deleteType(item.MaLSP)}
                            >x</div>
                            {item.TenLSP}</div>
                    </React.Fragment>
                )
            })}
        </div>
      </div>
    </div>
  );
}

export default AddTypeProduct;
