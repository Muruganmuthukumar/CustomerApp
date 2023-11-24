import "../Styles/SidePanel.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaChartLine, FaInfoCircle, FaStoreAlt, FaUser } from "react-icons/fa";
import { FaCartShopping, FaChevronLeft } from "react-icons/fa6";
import { isAuthenticated } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SidePanel({ toggle, setToggle }) {
  const { authentication } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenuClose = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(isAuthenticated(false))
    navigate('/signin')
  }

  return (
    <div className="container">
      <div className="side-panel" style={{ width: toggle ? "7vw" : "18vw" }}>
        <div>
          {toggle ? (
            <>
              <div className="user">
                <div className="img">
                  <img src="images/profile.webp" alt="profile" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="user">
                <div className="img">
                  <img src="images/profile.webp" alt="profile" />
                </div>
                <span style={{ display: toggle ? "none" : "block" }}>
                  Admin
                </span>
              </div>
            </>
          )}
        </div>
        <div
          className="link-container"
          style={{ height: toggle ? "auto" : "0" }}
        >
          <div className="link-content">
            <ul>
              <Link to={"/"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaChartLine className="icon" />
                    <span className="tooltip">Dashboard</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaChartLine className="icon" />
                    </div>
                    <li>
                      <span>DashBoard</span>
                    </li>
                  </>
                )}
              </Link>

              <Link to={"/customer"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaUser className="icon" />
                    <span className="tooltip">Customer</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaUser className="icon" />
                    </div>
                    <li>
                      <span>Customer</span>
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/order"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaCartShopping className="icon" />
                    <span className="tooltip">Order</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaCartShopping className="icon" />
                    </div>
                    <li>
                      <span>Order</span>
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/product"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaStoreAlt className="icon" />
                    <span className="tooltip">Product</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaStoreAlt className="icon" />
                    </div>
                    <li>
                      <span>Product</span>
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/about"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaInfoCircle className="icon" />
                    <span className="tooltip">About</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaInfoCircle className="icon" />
                    </div>
                    <li>About</li>
                  </>
                )}
              </Link>
              <Link
                onClick={handleLogout}
                className={toggle ? "close" : "open"}
              >
                {toggle ? (
                  <div>
                    <FaChevronLeft className="icon" />
                    <span className="tooltip">Signout</span>
                  </div>
                ) : (
                  <>
                    <div>
                      <FaChevronLeft className="icon" />
                    </div>
                    <li>Signout</li>
                  </>
                )}
              </Link>
            </ul>
          </div>
          <div className="collapse">
            <button onClick={handleMenuClose}>
              <FaChevronLeft
                className="icon icon-right"
                style={{
                  rotate: toggle ? "180deg" : "0deg",
                  transition: ".2s",
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="pages" style={{ width: toggle ? "100%" : "90%" }}>
        <nav>
          <h4>
            {location.pathname === "/"
              ? "DashBoard"
              : location.pathname.slice(1)}
          </h4>
        </nav>
        <Outlet />
      </div>
      {/* <div>{authentication && "Welcome to Home page"}</div> */}
    </div>
  );
}
