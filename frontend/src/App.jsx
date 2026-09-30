import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './components/Users/Register'
import Login from './components/Users/Login'
import Dashboard from './components/Users/Dashboard'
import Home from './components/Home/HomePage'
import PublicNavbar from './components/Navbar/PublicNavbar'
import PrivateNavbar from './components/Navbar/PrivateNavbar'
import { getuser } from "./utils/getuser";
import {useSelector} from 'react-redux';
import AddCategory from './components/Category/AddCategory';
import CategoriesList from './components/Category/CategoriesList';
import UpdateCategory from './components/Category/UpdateCategory';
import TransactionForm from './components/Transactions/TransactionForm';
import UserProfile from './components/Users/UserProfile';
import UpdatePassword from './components/Users/UpdatePassword';
import AuthRoute from './components/AuthRoute/AuthRoute';




function App() {


 
 const user = useSelector((state) => state?.auth?.user);



  return (
    <BrowserRouter>
      <div className="app-shell">
        <div className="app-shell__frame glass-surface">
          {user ? <PrivateNavbar /> : <PublicNavbar />}
          <main className="app-shell__content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/add-category"
                element={
                  <AuthRoute>
                    <AddCategory />
                  </AuthRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <AuthRoute>
                    <CategoriesList />
                  </AuthRoute>
                }
              />
              <Route
                path="/update-category/:id"
                element={
                  <AuthRoute>
                    <UpdateCategory />
                  </AuthRoute>
                }
              />
              <Route
                path="/add-transaction"
                element={
                  <AuthRoute>
                    <TransactionForm />
                  </AuthRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthRoute>
                    <UserProfile />
                  </AuthRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
  
}

export default App;
