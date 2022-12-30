import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supplierSlice} from "../../redux/reducer/supplierSlice";
import { toast } from "react-toastify";
import axios from "axios";
import supplierApi from "../../api/supplierApi";
import "./listSupplier.css"

export default function SupplierList() {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers.suppliers);

  useEffect(() => {
    const getSupplierList = async () => {
      try {
        const res = await supplierApi.getSuppliers();
        console.log(res.data.data);
        dispatch(supplierSlice.actions.setSupplier(res.data.data));
      } catch (err) {
        console.log(err);
      }
    };

    getSupplierList();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const newSupplierList = suppliers.filter((supplier) => supplier.id !== id);
      dispatch(supplierSlice.actions.setSupplier(newSupplierList));
      const res = await supplierApi.deleteSupplier(id);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  console.log(suppliers);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    // {
    //   field: "sl_name",
    //   headerName: "Name",
    //   width: 180,
    //   renderCell: (params) => {
    //     return (
    //       <div className="userListUser">
    //         <img className="voucherListImg" src={params.row.sl_name} alt="" />
    //       </div>
    //     );
    //   },
    // },
    {
      field: "sl_name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.sl_name}</div>
        );
      },
    },
    {
      field: "sl_email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">{params.row.sl_email}</div>
        );
      },
    },
    {
      field: "sl_phone",
      headerName: "Phone",
      width: 180,
    },
    {
      field: "sl_address",
      headerName: "Address",
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
              to={{ pathname: "/supplier/" + params.row.id }}
              state={{ supplier: params.row }}
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={suppliers}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r.id}
      />
    </div>
  );
}
