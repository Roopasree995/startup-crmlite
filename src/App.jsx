// Import Suspense from React, which is required to render a fallback UI while lazy-loaded components are loading.
import { Suspense } from 'react'

// Import BrowserRouter, Routes, and Route from react-router-dom to handle client-side routing.
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import the route configuration array containing our path-to-component mapping definitions.
import routes from './routes'

// Import the Sidebar layout component, which contains the navigation menu links.
import Sidebar from './components/Sidebar'

// Import Toaster from react-hot-toast to handle global operations notification banners.
import { Toaster } from 'react-hot-toast'

// Import App.css for stylesheet resets, styling rules, and layout classes.
import './App.css'

// Define the root App component that wraps the layout structure and registers the routing tree.
export default function App() {
  return (
    // Wrap the entire application in BrowserRouter to manage and sync history state with the browser address bar.
    <BrowserRouter>
      {/* Top-level layout container styled with Tailwind CSS for full viewport height and default slate-based colors */}
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
        {/* React Hot Toast notification center */}
        <Toaster position="top-right" />
        {/* Main layout grid/flex container setting a maximum content width and centering it on screen */}
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
          {/* Sidebar navigation component that remains persistent on the left of the page layout */}
          <Sidebar />

          {/* Wrapper container for the main page content, occupying all remaining horizontal space */}
          <div className="flex-1 min-w-0 pt-14 pb-16 md:pt-0 md:pb-0">
            {/* Suspense handles asynchronous loading of React.lazy components by rendering a loading indicator */}
            <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading requested view...</div>}>
              {/* Routes container coordinates route matching, rendering only the single Route that matches the current URL */}
              <Routes>
                {/* Map over the routes array configuration to dynamically declare Route elements */}
                {routes.map((route) => (
                  // Set a unique key, register the relative URL path, and assign the element component to render.
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}
