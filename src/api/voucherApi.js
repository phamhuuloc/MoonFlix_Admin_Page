import axiosClient from "./axiosClient";

const voucherApi = {
  getVochers(numberPage) {
    const url = `/vouchers`;
    return axiosClient.get(url);
  },
  createVoucher(voucher) {
    const url = "api/voucher/create";
    return axiosClient.post(url, voucher);
  },
  updateVoucher(id, voucher) {
    const url = `api/voucher/update/${id}`;
    return axiosClient.post(url, voucher);
  },

  deleteVoucher(id) {
    const url = `voucher/delete/${id}`;
    return axiosClient.post(url);
  },
};
export default voucherApi;
