import React ,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const {id} = useParams();
  const [name, setName] =useState();
  const [email, setEmail] =useState();
  const [age, setAge] =useState();
  const navigate = useNavigate();

  useEffect(() => {
     axios.get('http://localhost:3001/getUser/'+id)
      .then(res => {console.log(res)
      setName(res.data.name);
      setEmail(res.data.email);
      setAge(res.data.age);
      })
      .catch(err => console.log(err)); 
  }, [id]);
  
  const Update=(e)=>{
    e.preventDefault();
    axios.put('http://localhost:3001/updateUser/'+id,{
      name:name,
      email:email,
      age:age
    })
    .then(res =>{
       console.log(res)
       navigate('/')
    })
    .catch(err => console.log(err));
  }


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>

      <form onSubmit={Update}>
      <h2> Update User</h2>

      <div className='mb-2'>
        <label>Name</label>
        <input type='text' className='form-control'
        value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>

      <div className='mb-2'>
        <label>Email</label>
        <input type='email' className='form-control'
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>

      <div className='mb-2'>
        <label>Age</label>
        <input type='number' className='form-control'
        value={age} onChange={(e)=>setAge(e.target.value)}/>
      </div>

      <button className='btn btn-success'>Update</button>
      </form>  
    </div>
  </div>
  );
} 
export default UpdateUser;