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
  setOpenEnhanceModal,
  setOpenQSModal,
}) => {
  return (
    <Sidebar style={{ minHeight: boardHeight }}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
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
            onClick={setOpenEnhanceModal}
          >
            AI Refiner
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={FaHistory}
            onClick={() => setOpenHistoryModal(true)}
          >
            History
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={BiSolidCustomize}
            onClick={setOpenQSModal}
          >
            Quicksearch & Score
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
