import axiosClient from "./axiosClient";

const wareHouseApi = {
  createWareHouse(wareHouse) {
    const url = `/api/wareHouse/add`;
    return axiosClient.post(url, { wareHouse });
  },
  getallkho() {
    const url = `/api/wareHouses`;
    return axiosClient.get(url);
  },
};

export default wareHouseApi;
