import "../Styles/SidePanel.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChartLine, FaInfoCircle, FaStoreAlt, FaUser } from "react-icons/fa";
import { FaCartShopping, FaChevronLeft } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";

export default function SidePanel({ toggle, setToggle }) {
  const location = useLocation();
  const handleMenuClose = () => {
    setToggle(!toggle);
  };

  return (
    <div className="container">
      <div className="side-panel" style={{ width: toggle ? "7vw" : "18vw" }}>
        <div className="user" style={{ fontSize: toggle ? "16px" : "25px" }}>
          Admin
        </div>
        <div className="link-container">
          <div className="link-content">
            <ul>
              <Link to={"/"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <FaChartLine className="icon" />
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
                  </div>
                ) : (
                  <>
                    <div>
                      <FaInfoCircle className="icon" />
                    </div>
                    <li>
                      About
                    </li>
                  </>
                )}
              </Link>
              <Link to={"/sign-in"} className={toggle ? "close" : "open"}>
                {toggle ? (
                  <div>
                    <CgLogOut className="icon" />
                  </div>
                ) : (
                  <>
                    <div>
                      <CgLogOut className="icon" />
                    </div>
                    <li>
                      <span>SignOut</span>
                    </li>
                  </>
                )}
              </Link>
            </ul>
          </div>
          <div className="collapse" style={{left:toggle?"75px":"212px"}}>
            <button onClick={handleMenuClose}>
              <FaChevronLeft
                className="icon icon-right"
                style={{
                  rotate: toggle ? "180deg" : "0deg",
                  transition: "all .2s linear",
                }}
              />
            </button>
          </div>
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
