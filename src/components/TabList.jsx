const TabList = ({config, className, activeTab, setActiveTab}) => {
  return (
    <div className={`flex gap-4 items-center text-sm text-light-blue-400 ${className}`}>
      {config.map((entry, index) =>
        <p onClick={() => setActiveTab(index)} className={`${activeTab === index ? 'text-blue-primary font-bold' : ''}`}
          key={index}>
          {entry.header}
        </p>
      )}
    </div>
  )
}

export default TabList