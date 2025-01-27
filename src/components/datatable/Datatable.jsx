import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./datatable.scss";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc, index) => {
          list.push({ id: doc.id, tr: index + 1, ...doc.data() });
        });
        setData(list);
      },
      (err) => {
        toast.error("Mahsulotlarni olishda xatolik yuzaga keldi.");
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Mahsulot o'chirildi.");
    } catch (err) {
      toast.error("Mahsulot o'chirishda xatolik yuzaga keldi,");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Amallar",
      width: 200,
      sortable: false,
      headerAlign: "center",
      editable: true,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to={`/edit/${params.row.id}`} className='editButton'>
              Tahrirlash
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row.id)}>
              O'chirish
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        Yangi mahsulot qo'shish
        <Link to='/new' className='link'>
          Qo'shish
        </Link>
      </div>
      <DataGrid
        className='datagrid'
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default Datatable;
