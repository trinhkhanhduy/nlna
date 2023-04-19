import axiosClient from "./axiosClient";

const productTypeAPI = {
  innerJoinWareHouse (MaSP) {
    const url = `/api/productType/innerJoin/MaLSP=${MaSP}`;
    return axiosClient.get(url);
  },
  createTypeProduct(TenLSP){
    const url = `/api/productType/add`;
    return axiosClient.post(url,{TenLSP});
  },
  getAllTypeProduct(){
    const url = `/api/productTypes`;
    return axiosClient.get(url);
  },
  deleteTypeProduct(maLsp){
    const url = `/api/productType/MaLSP=${maLsp}`;
    return axiosClient.delete(url);
  }

}

export default productTypeAPI;