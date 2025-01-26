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
    setData({ ...data, [inputId]: inputValue });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
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
              {inputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={data[input.id] || ""}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type='submit'>Saqlash</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
