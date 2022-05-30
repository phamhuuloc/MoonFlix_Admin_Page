import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voucherSlice } from "../../redux/reducer/voucherSlice";
import { toast } from "react-toastify";
import axios from "axios";
import voucherApi from "../../api/voucherApi";
import "./listVoucher.css";

export default function VoucherList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.vouchers.vouchers);

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await voucherApi.getVochers(1);
        console.log(res);
        dispatch(voucherSlice.actions.setVoucher(res.data.vouchers));
      } catch (err) {
        console.log(err);
      }
    };

    getVoucherList();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const newVoucherList = vouchers.filter((voucher) => voucher._id !== id);
      dispatch(voucherSlice.actions.setVoucher(newVoucherList));
      const res = await voucherApi.deleteVoucher(id);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  console.log(vouchers);
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="voucherListImg" src={params.row.image} alt="" />
          </div>
        );
      },
    },
    {
      field: "voucher_code",
      headerName: "Voucher Code",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.voucher_code.length}</div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 180,
    },
    {
      field: "point_cost",
      headerName: "Point Cost",
      width: 160,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/vouchers/" + params.row._id }}
              state={{ voucher: params.row }}
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={vouchers}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
