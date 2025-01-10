import React from 'react'
import { Link } from 'react-router-dom';
import  { useEffect ,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from '../redux/actions/authActions';
import Button from '../components/Button';
const GetUsers = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.auth);
    console.log(users)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
      useEffect(() => {
         
        dispatch(getUsers());
      }, [dispatch]);
  return (
    <div> 

        <div className="mt-4">
        <div className="mb-3">
           <Link to='/setting/users/create-user'> <Button label="Create User"></Button></Link>
        </div>
        <h3>All Users</h3>
        {loading && <p>Loading users...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!loading && !error && users.length === 0 && <p>No users found.</p>}
        {!loading && !error && users.length > 0 && (
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {/* <td>{user.isActive ? 'Active' : 'Inactive'}</td> */}
                </tr>
              ))}
            </tbody>    
          </table>
        )}
      </div>

    </div>
  )
}

export default GetUsers