import "./userList.css";
import { toast } from "react-toastify";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/reducer/userSlice";
import axios from "axios";
import userApi from "../../api/userApi";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.arrayUsers);
  useEffect(() => {
    const getUsersList = async () => {
      try {
        const res = await userApi.getUsersList();
        dispatch(userSlice.actions.setUsers(res.data.users));
      } catch (err) {
        console.log(err);
      }
    };
    getUsersList();
  }, []);
  // console.log(dispatch(movieSlice.actions.getMovie()));
  //
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const newUsersList = users.filter((user) => user._id !== id);
      dispatch(userSlice.actions.setUsers(newUsersList));
      const res = await userApi.deleteUser(id);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt="" />
            {params.row.userncame}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "IsAdmin",
      width: 120,
    },
    {
      field: "point",
      headerName: "Point",
      width: 160,
    },
    {
      field: "wallet_balance",
      headerName: "Money",
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
              to={{ pathname: "/users/" + params.row._id }}
              state={{ user: params.row }}
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
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
