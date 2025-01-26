import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./datatable.scss";
import { toast } from "react-toastify";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
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
      toast.error("Mahsulot o'chirishda xaxtolik yuzaga keldi,");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Amallar",
      width: 200,
      sortable: false,
      editabele: true,
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
