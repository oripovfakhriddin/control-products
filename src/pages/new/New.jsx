import { useState } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./new.scss";

const New = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "countValue" || id === "countUnity") {
      setData((prev) => ({
        ...prev,
        count: {
          ...prev.count,
          [id === "countValue" ? "count" : "unity"]: value,
        },
      }));
    } else if (id === "priceValue" || id === "priceUnity") {
      setData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [id === "priceValue" ? "price" : "unity"]: value,
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const finalData = {
        ...data,
        count: {
          count: data.count?.count || 0,
          unity: data.count?.unity || "ta",
        },
        price: {
          price: data.price?.price || 0,
          unity: data.price?.unity || "UZS",
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), finalData);
      toast.success("Mahsulot qo'shildi.");
      navigate(-1);
    } catch (err) {
      toast.error("Mahsulot qo'shishda xatolik.");
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
            <form onSubmit={handleAdd}>
              <div className='formInput'>
                <label>Mahsulot nomi</label>
                <input
                  id='name'
                  type='text'
                  placeholder='Iphone 16 Pro Max'
                  required
                  onChange={handleInput}
                />
              </div>
              <div className='formInput formInput1'>
                <div>
                  <label>Mahsulot miqdori</label>
                  <input
                    id='countValue'
                    type='number'
                    required
                    placeholder='Mahsulot miqdori: 16'
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label>Mahsulot birligi</label>
                  <select
                    id='countUnity'
                    defaultValue='ta'
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
                    required
                    placeholder='Mahsulot narxi'
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label>Mahsulot narxi birligi</label>
                  <select
                    id='priceUnity'
                    defaultValue='UZS'
                    onChange={handleInput}>
                    <option value='UZS'>UZS</option>
                    <option value='USD'>USD</option>
                    <option value='RUB'>RUB</option>
                  </select>
                </div>
              </div>
              <button type='submit'>Qo'shish</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
