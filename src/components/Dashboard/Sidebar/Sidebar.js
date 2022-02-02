import React from "react";
import { Link } from "react-router-dom";
import style from "./Sidebar.module.css";
import { SidebarData } from "./SidebarData";


const Sidebar = (props) => {

  return (
    <>
     
    
      <div className="row" style={{margin:'0px'}}>
        <div className="d-none d-lg-flex" style={{padding:'0px',width: "15.5%"}}>

             <div className={style.sidebar}>

           
           <ul className={style.sidebarList}>
               {SidebarData.map((val,key)=>{
                   
                   return(
                      
                       <li
                       key={key}
                       
                       className={style.row }
                    >
                        
                           <Link to={`/dashboard${val.link}`}>
                               <div className={style.icon}>{val.icon}</div> <div className={style.title}>{val.title}</div>
                             
                           </Link>
                 </li>
                 
                )
               }
               )}
           </ul>
          
            </div>
        </div>
        
        <div className="col" id='restcolumn' style={{padding:'0px'}}>{props.children}</div>
      </div>
    
     
    </>
  );
};

export default Sidebar;

// ${window.location.pathname==val.link? 'active' : ''}
