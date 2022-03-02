import {useEffect, useState} from 'react';
import MainNavigation from './MainNavigation';
import Sidebar from "../../Admin-Side/Dashboard/Sidebar/Sidebar";
import {useSelector} from "react-redux";
import Cookies from "js-cookie";

const Layout = (props) => {
    const [isLogin, setIsLogin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const user = useSelector(state => state.user)

    const toggleMenu = () => {
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

    return (
        <>
            <MainNavigation toggleMenu={toggleMenu} isMenuOpen={isMenuOpen}/>
            {
                (isAdmin === null && isLogin === null) ? ""
                    :
                    isAdmin ?
                        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
                            <main>{props.children}</main>
                        </Sidebar> : <main>{props.children}</main>
            }
        </>
    );
};

export default Layout;
