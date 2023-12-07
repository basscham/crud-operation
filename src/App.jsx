import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

axios.defaults.baseURL = "https://backend-kj0g.onrender.com";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [datalist, setDatalist] = useState([]);

  const getfetchData = async () => {
    try {
      const response = await axios.get('/');
      setDatalist(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getfetchData();
  }, []);

  const handleOnChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
   
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/update/${editId}`, formData);
      if (response.data.success) {
        setEditMode(false);
        setEditId(null);
        setAddSection(false);
        alert(response.data.message);
        getfetchData();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('An error occurred');
    }
  };
  const handleAdd = async () => {
    try {
      const response = await axios.post('/create', formData);
      if (response.data.success) {
        setAddSection(false);
        alert(response.data.message);
        getfetchData();
      } else {
        alert('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      if (response.data.success) {
        alert(response.data.message);
        getfetchData();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('An error occurred');
    }
  };

  const handleEdit = (id) => {
    const selectedItem = datalist.find((item) => item._id === id);
    setFormData(selectedItem);
    setEditMode(true);
    setEditId(id);
    setAddSection(true);
  };

  const handleAddSection = () => {
    setAddSection(true);
    setFormData({
      name: '',
      email: '',
      mobile: '',
    });
  };

  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={handleAddSection}>
          Add
        </button>
        {addSection && (
          <div className='addcontainer'>
            <form onSubmit={(ev)=>ev.preventDefault()}>
              <button className='close-btn' onClick={() => setAddSection(false)}>
                <AiOutlineClose />
              </button>
              <label htmlFor='name'>Name:</label>
              <input type='text' id='name' name='name' onChange={handleOnChange} value={formData.name} />
              <label htmlFor='email'>Email:</label>
              <input type='text' id='email' name='email' onChange={handleOnChange} value={formData.email} />
              <label htmlFor='mobile'>Mobile:</label>
              <input type='number' id='mobile' name='mobile' onChange={handleOnChange} value={formData.mobile} />
              <button className='submit' type='submit'onClick={editMode ? handleUpdate : handleAdd}>
                {editMode ? 'Update' : 'Submit'}
              </button>
              <div></div>
            </form>
          </div>
        )}
        <div className='card '>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datalist.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td>
                    <button className='btn-edit' onClick={() => handleEdit(u._id)}>
                      Edit
                    </button>
                    <button className='btn-delete' onClick={() => handleDelete(u._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
