import React, { useState, useContext } from 'react'

const SidebarContext = React.createContext()

function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((currentSidebarState) => !currentSidebarState)
  }

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

function useSidebar() {
  const context = useContext(SidebarContext)
  return context
}

export { SidebarProvider, useSidebar }
