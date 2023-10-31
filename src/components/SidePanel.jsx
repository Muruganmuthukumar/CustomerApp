import "../Styles/SidePanel.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChartLine, FaInfoCircle, FaStoreAlt, FaUser } from "react-icons/fa";
import { FaCartShopping, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";

export default function SidePanel({ toggle, setToggle }) {
  const location = useLocation();
  // const [menuStyles,setMenuStyles]=useState({})
  const handleMenuClose = () => {
    // setMenuStyles(
    //   {
    //   color:"red",
    //   fontSize:"30px"
    // })
    setToggle(!toggle);
  };
  return (
    <div className="container">
      <div className="side-panel" style={{ width:(toggle ? "6%" : "20%") }}>
        <div className="user" style={{fontSize:toggle?"16px":"25px"}}>Admin</div>
        <div className="link-container">
          <ul>
            <Link to={"/"}>
              <FaChartLine className="icon" />
              <li style={{ display:toggle ? "none" : "block"}}>DashBoard</li>
            </Link>

            <Link to={"/customer"}>
              <FaUser className="icon" />
              <li style={{ display: toggle ? "none" : "block" }}>Customer</li>
            </Link>
            <Link to={"/order"}>
              <FaCartShopping className="icon" />
              <li style={{ display: toggle ? "none" : "block" }}>Order</li>
            </Link>
            <Link to={"/product"}>
              <FaStoreAlt className="icon" />
              <li style={{ display: toggle ? "none" : "block" }}>Product</li>
            </Link>
            <Link to={"/about"}>
              <FaInfoCircle className="icon" />
              <li style={{ display: toggle ? "none" : "block" }}>About</li>
            </Link>
          </ul>
        </div>
        <div className="logout">
          <button>
            <CgLogOut className="icon" />
            <span style={{ display: toggle ? "none" : "block" }}>Logout</span>
          </button>
        </div>
        <div className="shrink">
          <button onClick={handleMenuClose}>
            {toggle ? (
              <FaChevronRight className="icon" />
            ) : (
              <FaChevronLeft className="icon" />
            )}
          </button>
        </div>
      </div>
      <div className="pages" style={{ width: toggle ? "100%" : "90%" }}>
        <nav>
          {/* <h2 style={toggle?{...menuStyles}:{}}>Demo</h2> */}
          {/* <h2>Demo</h2> */}
          <h4>
            {location.pathname === "/"
              ? "DashBoard"
              : location.pathname.slice(1)}
          </h4>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
