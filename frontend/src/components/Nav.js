import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      
      <img 
      alt="Logo"
      className="logo"
      src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vHAHpYxSDebyiXlXtWkW2cR5Qq42-_zDRg&s"/>
       {auth ?  <ul className="nav-ul">
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add"> Add Products</Link></li>
        <li><Link to="/update">update Products</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout ({})</Link></li>
          
      </ul>
      :
      <ul className="nav-ul nav-right" >
        <li> <Link to="/signup">Signup</Link></li>
        <li><Link to="/Login">Login</Link> </li>
      </ul>
       }
    </div>
  );
};
export default Nav;
