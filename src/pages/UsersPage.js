import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAll } from '../reducers/usersReducer';

const UsersPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default UsersPage;
