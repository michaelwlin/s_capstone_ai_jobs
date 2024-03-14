import { Sidebar } from 'flowbite-react'
import {
  FaUpload,
  FaSpellCheck,
  FaHistory,
  FaDownload,
  FaBox,
  FaRegLightbulb,
} from 'react-icons/fa'
import { BiSolidCustomize } from 'react-icons/bi'

const ResumeSidebar = ({
  boardHeight,
  setOpenUploadModal,
  setOpenHistoryModal,
  saveAsPdf,
  setOpenWordBankModal,
}) => {
  return (
    <Sidebar style={{ minHeight: boardHeight }}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Item href="#" icon={IoMdAddCircle}>
            Add Section
          </Sidebar.Item> */}
          <Sidebar.Item
            icon={FaUpload}
            onClick={() => setOpenUploadModal(true)}
          >
            Upload Resume
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaBox} onClick={setOpenWordBankModal}>
            AI Wordbank
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={FaRegLightbulb}
            onClick={setOpenWordBankModal}
          >
            AI Suggestions
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
          <Sidebar.Item icon={FaDownload} onClick={saveAsPdf}>
            Download as PDF
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default ResumeSidebar
