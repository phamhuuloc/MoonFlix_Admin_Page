import axiosClient from "./axiosClient";

const supplierApi = {
  getSuppliers(numberPage) {
    const url = `/suppliers`;
    return axiosClient.get(url);
  },
  createSupplier(supplier) {
    const url = "api/supplier/create";
    return axiosClient.post(url, supplier);
  },
  updateSupplier(id, supplier) {
    const url = `api/supplier/update/${id}`;
    return axiosClient.post(url, supplier);
  },

  deleteSupplier(id) {
    const url = `api/supplier/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default supplierApi;
