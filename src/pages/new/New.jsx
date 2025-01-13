import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const New = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
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
              {inputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type='submit'>Qo'shish</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
