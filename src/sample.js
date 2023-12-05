
// ... (other imports and code)

function App() {
    // State to control the visibility of the form
    const [isAddSectionVisible, setAddSectionVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      mobile: '',
    });
    const [datalist, setDatalist] = useState([]);
  
    // Function to fetch data from the server
    const getfetchData = async () => {
      try {
        const response = await axios.get('/');
        setDatalist(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // UseEffect to fetch data when the component mounts
    useEffect(() => {
      getfetchData();
    }, []);
  
    // Function to handle changes in the form inputs
    const handleOnChange = (ev) => {
      const { name, value } = ev.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    handle form submission
    const handleSubmit = async (ev) => {
      ev();
.preventDefault  
             if (editMode) {
          const response = await axios.put(`/update/${editId}`, formData);
          if (response.data.success) {
            setEditMode(false);
            setEditId(null);
            alert(response.data.message);
            getfetchData();
          }
           Update failed');
          }
        } else {
          const response = await axios.post('/create', formData);
          if (response.data.success) {
            setAddSectionVisible(false);
            alert(response.data.message);
            getfetchData();
          } else {
            alert('Form submission failed');
          }
        }
      } catch (error) {
       ('Error console.error form:', error);
        error occurred alert('An
      }; // Function to handle delet an item
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`/delete}`);/${id.data.success) {
          alert(response.data.message);
          getfetchData();
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('An error occurred');
      }
    };
  
    // Function to handle updating an item
    const handleUpdate = (id) => {
      const selectedItem = datal((item)find id);
id ===FormData);
      setEditMode(true);
      setEditId(id);
      setAddSectionVisible(true);
    };
  
    // Function to handle showing the form for adding a new item
    const handleAddSection = () => {
      setAddSectionVisible(true);
      setFormData({
        name: '',
        email: '',
: '',
        mobile      };
  
    return (
      <>
        <div className='container'>
          <button className='btn btn-add' onClick={handleAddSection}>
            Add
          </button>
          {isAddSectionVisible && (
            <div className='addcontainer'>
              <form onSubmit={handleSubmit}>
                {/* ... (other form inputs) */}
                <button className='submit' type='submit'>
                 {editMode ? 'Update' : 'Submit'}
                </button>
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
                      <button className='btn-edit' onClick={() => handleUpdate(u._id)}>
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
  
//
//This code is a React application that allows users to add, update, and delete items. The application uses the useState and useEffect hooks to manage state and side effects. The code also includes functions to handle form submission, deletion, and updating of items.