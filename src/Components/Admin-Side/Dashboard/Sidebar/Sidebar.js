import React from "react";
import {Link} from "react-router-dom";
import style from "./Sidebar.module.css";
import {SidebarData} from "./SidebarData";


const Sidebar = ({isMenuOpen, toggleMenu, children}) => {

    return (
        <>
            <div className="row" style={{margin: '0px'}}>
                <div className={`d-xl-flex ${isMenuOpen ? 'd-none' : ""}`} style={{padding: '0px', width: "15.5%"}}>

                    <div className={`${style.sidebar} ${isMenuOpen ? "" : style.menuOpen}`}>
                        <ul className={style.sidebarList}>
                            {SidebarData.map((val, key) => {
                                return (
                                    !isMenuOpen ?
                                        <li key={key} className={style.row}>
                                            <Link to={`/dashboard${val.link}`} onClick={toggleMenu}>
                                                <div className={style.icon}
                                                     // onClick={() => {
                                                     //     dispach(Redirect(`/dashboard${val.link}`));
                                                     // }}
                                                >{val.icon}</div>
                                                <div className={style.title}
                                                     // onClick={() => {
                                                     //     dispach(Redirect(`/dashboard${val.link}`));
                                                     // }
                                                    // }
                                                >{val.title}</div>
                                            </Link>
                                        </li>
                                        :
                                        <li key={key} className={style.row}>
                                            <Link to={`/dashboard${val.link}`}>
                                                <div className={style.icon}
                                                     // onClick={() => {
                                                     //     dispach(Redirect(`/dashboard${val.link}`));
                                                     // }}
                                                >{val.icon}</div>
                                                <div className={style.title}
                                                     // onClick={() => {
                                                     //     dispach(Redirect(`/dashboard${val.link}`));
                                                     // }}
                                                >{val.title}</div>
                                            </Link>
                                        </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col" id='restcolumn' style={{padding: '0px'}}>{children}</div>
            </div>
        </>
    );
};

export default Sidebar;
