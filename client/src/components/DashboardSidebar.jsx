import { Sidebar } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiChartPie, HiCog, HiViewBoards } from 'react-icons/hi'

const DashboardSidebar = () => {
  return (
    <Sidebar className="h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <Link to="/dashboard">Dashboard</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiViewBoards}>
            <Link to="/resume">My Resume</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiCog}>
            <Link to="/user-settings">Settings</Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashboardSidebar
