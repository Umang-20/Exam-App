import {Fragment, useEffect, useState} from 'react';

import MainNavigation from './MainNavigation';
import Sidebar from "../../Admin-Side/Components/Dashboard/Sidebar/Sidebar";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";

const Layout = (props) => {
    const [isLogin, setIsLogin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const user = useSelector(state => state.user)

    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        if (Cookies.get("settoken")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
        if (Cookies.get('isAdmin') === "true") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user])
    // console.log(isAdmin,isLogin);

  return (
    <Fragment>
      <MainNavigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
      {/*<div style={{width:"300px"}}>*/}

      {/*</div>*/}
        {
            (isAdmin === null && isLogin === null)?"":
                isAdmin?
                    <Sidebar isMenuOpen={isMenuOpen}>
                        <main>{props.children}</main>
                    </Sidebar>
                    :
                    <main>{props.children}</main>
        }

    </Fragment>
  );
};

export default Layout;
