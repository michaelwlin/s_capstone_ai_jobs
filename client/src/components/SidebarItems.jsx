import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiInbox, HiCog, HiUser, HiViewBoards } from "react-icons/hi";

const SidebarItems = () => {
  return (
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="/dashboard" icon={HiChartPie}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="/resume" icon={HiViewBoards}>
          My Resume
        </Sidebar.Item>
        <Sidebar.Item href="/user-settings" icon={HiCog}>
          Settings
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  );
}

export default SidebarItems;
