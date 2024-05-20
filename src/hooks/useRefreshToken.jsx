import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    const response = await axios.post('/api/Identity/refresh', JSON.stringify({ token: auth().accessToken, refreshToken: auth().refreshToken }), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true

    });
    console.log(JSON.stringify(auth()));
    console.log(response.data.token);
    setAuth({ ...auth(), accessToken: response.data.token, refreshToken: response.data.refreshToken });
    console.log({ ...auth(), accessToken: response.data.token, refreshToken: response.data.refreshToken });
    return response.data.token;
  }
  return refresh;
};

export default useRefreshToken