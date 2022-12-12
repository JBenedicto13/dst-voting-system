import React from 'react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineHowToVote } from "react-icons/md";
import { MdOutlinePersonPin } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
import { TfiLayoutMediaCenter } from "react-icons/tfi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export const SideBarDataAdmin = [
  {
    title: "Dashboard",
    icon: <MdOutlineSpaceDashboard />,
    link: "/admin/dashboard"
  },
  {
    title: "Elections",
    icon: <MdOutlineHowToVote />,
    link: "/admin/elections"
  },
  {
    title: "Candidates",
    icon: <MdPeopleOutline />,
    link: "/admin/candidates"
  },
  {
    title: "Contents",
    icon: <TfiLayoutMediaCenter />,
    link: "/admin/contents"
  },
  {
    title: "Logout",
    icon: <CiLogout />,
    link: "/admin/logout"
  },
]