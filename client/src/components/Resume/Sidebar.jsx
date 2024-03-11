import { Sidebar } from 'flowbite-react'
import { IoMdAddCircle } from 'react-icons/io'
import { FaUpload, FaSpellCheck, FaHistory } from 'react-icons/fa'
import { BiSolidCustomize } from 'react-icons/bi'

const ResumeSidebar = ({
  boardHeight,
  setOpenUploadModal,
  setOpenHistoryModal,
}) => {
  return (
    <Sidebar style={{ minHeight: boardHeight }}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={IoMdAddCircle}>
            Add Section
          </Sidebar.Item>
          <Sidebar.Item
            icon={FaUpload}
            onClick={() => setOpenUploadModal(true)}
          >
            Upload Resume
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaSpellCheck}>
            AI Proof Read
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={FaHistory}
            onClick={() => setOpenHistoryModal(true)}
          >
            History
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiSolidCustomize}>
            Tailor for Job
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default ResumeSidebar