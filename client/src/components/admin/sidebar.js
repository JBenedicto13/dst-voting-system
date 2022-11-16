import React from 'react'
import GetCurrentDate from '../../utils/GetCurrentDate';
import '../admin/adminStyle/sidebar.css';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineHowToVote } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { TfiLayoutMediaCenter } from "react-icons/tfi";
import { MdOutlineManageAccounts } from "react-icons/md";

const sidebar = () => {
  return (
    <div className='sidebar'>
        <p className='date'><GetCurrentDate /></p>
        <ul className='sidebarlist'>
                <li><MdOutlineSpaceDashboard/>Dashboard</li>
                <li><MdOutlineHowToVote/>Election</li>
                <li><MdOutlinePersonPin/>Voters</li>
                <li><MdPeopleOutline/>Candidates</li>
                <li><TfiLayoutMediaCenter/>Contents</li>
                <li><MdOutlineManageAccounts/>Accounts</li>
                <li><MdOutlineManageAccounts/>Logout</li>
        </ul>
    </div>
  )
}

export default sidebar