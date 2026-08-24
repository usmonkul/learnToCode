import { useEffect } from 'react'
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import TopNav from '@/components/layout/TopNav'
import HomePage from '@/pages/HomePage'
import CoursesPage from '@/pages/CoursesPage'
import ArenaPage from '@/pages/ArenaPage'
import ArenaTopicPage from '@/pages/ArenaTopicPage'
import CourseOverviewPage from '@/pages/CourseOverviewPage'
import LessonPage from '@/pages/LessonPage'
import LoginPage from '@/pages/LoginPage'
import ProfilePage from '@/pages/ProfilePage'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import NotFoundPage from '@/pages/NotFoundPage'
import RequireAuth from '@/components/auth/RequireAuth'
import { useUIStore } from '@/store/uiStore'

function ScrollToTop() {
  const { pathname } = useLocation()
  const closeSidebar = useUIStore((state) => state.closeSidebar)

  useEffect(() => {
    window.scrollTo(0, 0)
    closeSidebar()
  }, [pathname, closeSidebar])

  return null
}

function RootLayout() {
  return (
    <div className="min-h-screen bg-canvas-muted">
      <ScrollToTop />
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
        <Route path="/kurslar" element={<CoursesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/arena" element={<ArenaPage />} />
          <Route path="/arena/:topicId" element={<ArenaTopicPage />} />
          <Route path="/arena/:topicId/:challengeSlug" element={<ArenaTopicPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/:courseId" element={<CourseOverviewPage />} />
        <Route path="/:courseId/:slug" element={<LessonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
