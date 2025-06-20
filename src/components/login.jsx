import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosconfig';
import Loading from './Loading';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (loading) return;
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/login' : 'register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            gender: formData.gender,
            profile: {
              name: formData.name,
              email: formData.email,
              gender: formData.gender,
            },
          };
      const response = await axiosInstance.post(endpoint, payload);
      const data = response.data;
      dispatch(
        setUser({
          user: data.user || data,
          token: data.token || data.accessToken || null,
        })
      );
      navigate('/home');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="card bg-green-200 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-950">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            {error && !loading && (
              <div className="alert alert-error mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <Loading />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="label">
                      <span className="label-text text-blue-950 ">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="label">
                    <span className="label-text text-blue-950">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-blue-950">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="label">
                      <span className="label-text text-blue-950">Gender</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {isLogin && (
                  <div className="flex justify-between items-center">
                    <label className="label cursor-pointer"></label>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-red w-full"
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </button>

                <div className="divider">OR</div>

                <div className="text-center">
                  <p className="text-sm text-blue-950">
                    {isLogin
                      ? "Don't have an account?"
                      : 'Already have an account?'}
                    <button
                      type="button"
                      onClick={toggleMode}
                      className="text-primary font-medium ml-2"
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login