// import "./edit.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import { useState, useEffect } from "react";
// import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { db } from "../../firebase";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

// const Edit = ({ inputs, title }) => {
//   const [data, setData] = useState({});
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const docRef = doc(db, "products", id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setData(docSnap.data());
//           toast.success("Ma'lumot tahrirlash uchun olindi.");
//         } else {
//           toast.error("Bunday hujjat mavjud emas!");
//         }
//       } catch (err) {
//         toast.error("Ma'lumotni olishda xatolik");
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleInput = (e) => {
//     const inputId = e.target.id;
//     const inputValue = e.target.value;
//     setData({ ...data, [inputId]: inputValue });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = doc(db, "products", id);
//       await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
//       toast.success("Tahrir muvaffaqiyatli saqlandi!");
//       navigate(-1);
//     } catch (err) {
//       toast.error("Tahrirni saqlashda xatolik");
//     }
//   };

//   return (
//     <div className='new'>
//       <Sidebar />
//       <div className='newContainer'>
//         <Navbar />
//         <div className='top'>
//           <h1>{title}</h1>
//         </div>
//         <div className='bottom'>
//           <div className='right'>
//             <form onSubmit={handleUpdate}>
//               {inputs.map((input) => (
//                 <div className='formInput' key={input.id}>
//                   <label>{input.label}</label>
//                   <input
//                     id={input.id}
//                     type={input.type}
//                     placeholder={input.placeholder}
//                     value={data[input.id] || ""}
//                     onChange={handleInput}
//                   />
//                 </div>
//               ))}
//               <button type='submit'>Saqlash</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Edit;

import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
          toast.success("Ma'lumot tahrirlash uchun olindi.");
        } else {
          toast.error("Bunday hujjat mavjud emas!");
        }
      } catch (err) {
        toast.error("Ma'lumotni olishda xatolik");
      }
    };

    fetchData();
  }, [id]);

  const handleInput = (e) => {
    const inputId = e.target.id;
    const inputValue = e.target.value;

    if (inputId === "countValue" || inputId === "countUnity") {
      setData((prev) => ({
        ...prev,
        count: {
          ...prev.count,
          [inputId === "countValue" ? "count" : "unity"]: inputValue,
        },
      }));
    } else if (inputId === "priceValue" || inputId === "priceUnity") {
      setData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [inputId === "priceValue" ? "price" : "unity"]: inputValue,
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [inputId]: inputValue,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      const updatedData = {
        ...data,
        count: {
          count: data.count?.count || 0,
          unity: data.count?.unity || "ta",
        },
        price: {
          price: data.price?.price || 0,
          unity: data.price?.unity || "UZS",
        },
        updatedAt: serverTimestamp(),
      };

      await updateDoc(docRef, updatedData);
      toast.success("Tahrir muvaffaqiyatli saqlandi!");
      navigate(-1);
    } catch (err) {
      toast.error("Tahrirni saqlashda xatolik");
    }
  };

  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form onSubmit={handleUpdate}>
              <div className='formInput'>
                <label>Mahsulot nomi</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Iphone 16 Pro Max'
                  value={data.name || ""}
                  onChange={handleInput}
                />
              </div>
              <div className='formInput formInput1'>
                <div>
                  <label>Mahsulot miqdori</label>
                  <input
                    id='countValue'
                    type='number'
                    placeholder='Mahsulot miqdori: 16'
                    value={data.count?.count || ""}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label>Mahsulot birligi</label>
                  <select
                    id='countUnity'
                    value={data.count?.unity || "ta"}
                    onChange={handleInput}>
                    <option value='ta'>ta</option>
                    <option value='pachka'>pachka</option>
                    <option value='yashik'>yashik</option>
                    <option value='kg'>kg</option>
                    <option value='quti'>quti</option>
                    <option value='metr'>metr</option>
                  </select>
                </div>
              </div>
              <div className='formInput formInput1'>
                <div>
                  <label>Mahsulot narxi</label>
                  <input
                    id='priceValue'
                    type='number'
                    placeholder='Mahsulot narxi'
                    value={data.price?.price || ""}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label>Mahsulot narxi birligi</label>
                  <select
                    id='priceUnity'
                    value={data.price?.unity || "UZS"}
                    onChange={handleInput}>
                    <option value='UZS'>UZS</option>
                    <option value='USD'>USD</option>
                    <option value='RUB'>RUB</option>
                  </select>
                </div>
              </div>
              <button type='submit'>Saqlash</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
