import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await authService.login({
        firstName,
        lastName,
        password,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    navigate(-1);
  };

  return (
    <main>
      <h1>Guest login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log in</button>
      </form>
    </main>
  );
};

export default Login;
