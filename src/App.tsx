import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import TrendingPanel from './components/TrendingPanel'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 grid grid-cols-1 lg:grid-cols-[18rem_1fr_20rem]">
      <Sidebar />
      <MainContent />
      <aside className="px-4 pb-10 lg:px-6 lg:py-6">
        <TrendingPanel />
      </aside>
    </div>
  )
}

export default App
