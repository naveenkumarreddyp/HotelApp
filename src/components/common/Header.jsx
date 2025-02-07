import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link className="text-xl font-bold text-gray-800" to="/">
              Hotel Booking App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link className="text-gray-600 hover:text-gray-900" to="/">
              Home
            </Link>
            <Link className="text-gray-600 hover:text-gray-900" to="/hotels">
              Hotels
            </Link>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;