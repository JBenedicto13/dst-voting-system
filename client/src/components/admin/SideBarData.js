import React from 'react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineHowToVote } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { TfiLayoutMediaCenter } from "react-icons/tfi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export const SideBarData = [
  // {
  //   title: "Dashboard",
  //   icon: <MdOutlineSpaceDashboard />,
  //   link: "/admin/dashboard"
  // },
  {
    title: "Elections",
    icon: <MdOutlineHowToVote />,
    link: "/admin/elections"
  },
  {
    title: "Voters",
    icon: <MdOutlinePersonPin />,
    link: "/admin/voters"
  },
  {
    title: "Candidates",
    icon: <MdPeopleOutline />,
    link: "/admin/candidates"
  },
  // {
  //   title: "Contents",
  //   icon: <TfiLayoutMediaCenter />,
  //   link: "/admin/contents"
  // },
  {
    title: "Accounts",
    icon: <MdOutlineManageAccounts />,
    link: "/admin/accounts"
  },
  {
    title: "Logout",
    icon: <CiLogout />,
    link: "/admin/logout"
  },
]