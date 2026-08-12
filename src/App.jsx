import { Routes, Route, Outlet } from 'react-router-dom'
import TopNav from '@/components/layout/TopNav'
import HomePage from '@/pages/HomePage'
import CourseOverviewPage from '@/pages/CourseOverviewPage'
import LessonPage from '@/pages/LessonPage'
import NotFoundPage from '@/pages/NotFoundPage'

function RootLayout() {
  return (
    <div className="min-h-screen bg-canvas-muted">
      <TopNav />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/:courseId" element={<CourseOverviewPage />} />
        <Route path="/:courseId/:slug" element={<LessonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
