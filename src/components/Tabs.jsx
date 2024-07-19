import { useState } from "react"
import { TabList } from ".."
import { useDispatch } from "react-redux"
import { resetTodo } from '../redux/todoSlice'

const Tabs = ({config, length}) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(0)
  return (<>
    <div className="rounded-lg sm:rounded-b-none container relative -top-10 bg-white">
      {config[activeTab].component}
      <div className="flex items-center cursor-pointer px-6 py-4 justify-between text-sm text-light-blue-400">
        <p className="cursor-text">{length} item{length > 1 ? 's': ''} left</p>
        <TabList activeTab={activeTab} setActiveTab={setActiveTab} config={config} className='max-sm:hidden' />
        <p onClick={() => dispatch(resetTodo())}>Clear completed</p>
      </div>
    </div>
    <TabList activeTab={activeTab} setActiveTab={setActiveTab} config={config} className='cursor-pointer px-6 py-4 rounded-lg justify-center mt-5 sm:hidden' />
  </>)
}

export default Tabs