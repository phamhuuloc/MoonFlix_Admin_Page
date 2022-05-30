import axiosClient from "./axiosClient";

const voucherApi = {
  getVochers(numberPage) {
    const url = `api/vouchers/list?page=${numberPage}`;
    return axiosClient.get(url);
  },
  createVoucher(voucher) {
    const url = "api/vouchers/create";
    return axiosClient.post(url, voucher);
  },
  updateVoucher(id, voucher) {
    const url = `api/vouchers/update/${id}`;
    return axiosClient.post(url, voucher);
  },

  deleteVoucher(id) {
    const url = `api/vouchers/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default voucherApi;
