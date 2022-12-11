import React from 'react'
import GetCurrentDate from '../../utils/GetCurrentDate';
import '../admin/adminStyle/sidebar.css';
import {SideBarData} from './SideBarData.js';
import candidate1 from '../../assets/candidate1.png';

const Sidebar = () => {

  return (
    <div className='sidebar'>
      <p className='date'><GetCurrentDate /></p>
      <ul className='sidebarlist'>
        {SideBarData.map((val,key) => {
          return (
            <li
              className='sidebaritem'
              id={window.location.pathname === val.link ? "active" : ""}
              key={key} onClick={()=>{
              window.location.pathname = val.link;
            }}>
            <div id='icon'>{val.icon}</div>
            <div id='title'>
              {val.title}
            </div>
            </li>
          )
        })}
      </ul>
      <div className='accountTab'>
          <div className='col pfpImage'>
            <img src={candidate1} alt='pfp'></img>
          </div>
          <div className='col info'>
            <p>{sessionStorage.getItem("admin-email")}</p>
          </div>
      </div>
    </div>
  )
}

export default Sidebar