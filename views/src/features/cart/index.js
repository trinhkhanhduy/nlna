import "./style_cartpage.css";
import React, {useEffect, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {Table, Row, Col} from "antd";
import {DeleteFilled,PlusOutlined,MinusOutlined } from "@ant-design/icons";

import cartAPI from "../../api/cartAPI";
import KhachHangAPI from "../../api/khachhangAPI";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import importIncoiceAPI from "../../api/importInvoice";

function CartPage() {
  const [cartData, setCartData] = useState([]);
  const [sumGiaSPX, setSumGiaSPX] = useState("");
  const [dataKhachHang, setDataKhachHang] = useState([]);

  const Username = useSelector((state) => state.user.current.username);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data_Product = await cartAPI.innerJoinProduct(Username);
        setCartData(data_Product);
        const data_sumMaSPX = await cartAPI.sumOrder(Username);
        setSumGiaSPX(data_sumMaSPX[0].sumOrder);
        const dataKH = await KhachHangAPI.findAll(Username);
        setDataKhachHang(dataKH);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [Username]);

  const formatNumber = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const delProduct = async (MaGH) => {
    await cartAPI.DeleteOne(MaGH);
    window.location.reload();
  }

  const history = useHistory();
  const checkProfile = () => {
    if(!dataKhachHang){
      history.push("/profile");
    }else{
      history.push("/payment");
    }
  }
  const dataCart = (username, masp, slsp) => {
    return {
      Username: username,
      MaSP: masp,
      SLSP: slsp,
    };
  };
  const isLogin = useSelector((state) => state.user.current.accessToken);
  const match = useRouteMatch();
  const addProduct = async (MaSP,action,magh) => {
    const soluongnhap = await importIncoiceAPI.fineOne(MaSP);
      
    if (!isLogin) {
      localStorage.setItem("urlproduct", match.url);
      history.push("/register");
    }
    const datacart = await cartAPI.fineOne(Username, MaSP);
    if (datacart) {
      if(datacart[0].SLSP <=0){
        delProduct(magh)
     }else{
      if(datacart[0].SLSP < soluongnhap[0].SoLuongNhap){
        cartAPI.updateOne(dataCart(Username, MaSP, action ? datacart[0].SLSP + 1:datacart[0].SLSP - 1));
        window.location.reload();
      }else{
        alert("So luong vuot qua so luong san pham ton kho")
      }
     }
     
    } else {
      
      cartAPI.create(dataCart(Username, MaSP, 1));
      window.location.reload();
    }
  };
  const columns = [
    {
      title: "",
      dataIndex: "HinhAnhSP",
      key: "HinhAnhSP",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <>
          <img className="img_product_cart" src={text} alt="hinh anh" />
        </>
      ),
    },
    {
      title: "Sản Phẩm",
      dataIndex: "TenSP",
      key: "TenSP",
    },
    {
      title: "Giá",
      dataIndex: "GiaSPX",
      key: "GiaSPX",
      align: "center",
    },
    {
      title: "Số Lượng",
      dataIndex: "SoLuongSP",
      key: "SoLuongSP",
      align: "center",
      render: (text, record) => (
        <>
           <div onClick={()=>addProduct(text.masp,true,text.magh)}>
            <PlusOutlined/>
            </div>
          <div >
            {text.soluong}
            {/* <DeleteFilled style={{ fontSize: '16px', color: '#C7031E' }} /> */}
          
         
            
            <div onClick={()=>addProduct(text.masp,false,text.magh)}>
            <MinusOutlined/>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Tạm Tính",
      key: "TamTinh",
      dataIndex: "TamTinh",
      align: "center",
    },
    {
      title: "",
      key: "xoa",
      dataIndex: "xoa",
      align: "center",
      render: (text, record) => (
        <>
          <div className="del_product" onClick={() => delProduct(text)}>
            <DeleteFilled style={{ fontSize: '16px', color: '#C7031E' }} />
          </div>
        </>
      ),
    },
  ];

  const data = cartData?.map(({HinhAnhSP, TenSP, GiaSPX, SLSP, MaGH,MaSP}, i) => ({
    key: `${i}`,
    HinhAnhSP: `${HinhAnhSP.slice(12, HinhAnhSP.length)}`,
    TenSP: `${TenSP}`,
    GiaSPX: `${formatNumber.format(GiaSPX)}`,
    SoLuongSP: {soluong:`${SLSP}`,masp : `${MaSP}`,magh:`${MaGH}`},
    TamTinh: `${formatNumber.format(GiaSPX * SLSP)}`,
    xoa: `${MaGH}`,
  }));
 
  return (
    <div className="container_cart">
      {cartData.length !== 0 ? (
        <>
          <div>
            <Table columns={columns} dataSource={data} pagination={false} />
          </div>
          <div className="wrap_order">
            <h2>CỘNG GIỎ HÀNG</h2>
            <div className="order_cart">
              <Row>
                <Col span={6}>
                  <strong>Tạm tính</strong>
                </Col>
                <Col span={18}>{formatNumber.format(sumGiaSPX)}</Col>
              </Row>
              <Row>
                <Col span={6}>
                  <strong>Giao hàng</strong>
                </Col>
                <Col span={18}>
                  Giao hàng tận nơi: 30.000 ₫ <br /> Tùy chọn giao hàng sẽ được
                  cập nhật trong quá trình thanh toán.
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <strong>Tổng</strong>
                </Col>
                <Col span={18}>{formatNumber.format(sumGiaSPX)}</Col>
              </Row>
            </div>
            <div>
              <button className="btn_thanhtoan" onClick={checkProfile}>TIẾN HÀNH THANH TOÁN</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div><h2>Không có sản phẩm nào trong giỏ hàng !!!</h2></div>
          <NavLink to="/products" ><div className="btn_BackProductPage">TRỞ LẠI TRANG SẢN PHẨM</div></NavLink>
        </>
      )}
    </div>
  );
}

export default CartPage;
