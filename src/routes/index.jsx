/* eslint-disable react-refresh/only-export-components */
// Import the 'lazy' function from React to enable lazy loading (code-splitting) of route components.
import { lazy } from 'react'

// Lazy-load the Dashboard component. React will only fetch this component when the user visits the '/' route.
const DashboardPage = lazy(() => import('../pages/Dashboard'))

// Lazy-load the Leads component. React will only fetch this component when the user visits the '/leads' route.
const LeadsPage = lazy(() => import('../pages/Leads'))

// Lazy-load the Analytics component. React will only fetch this component when the user visits the '/analytics' route.
const AnalyticsPage = lazy(() => import('../pages/Analytics'))

// Lazy-load the NotFound component. React will only fetch this component if none of the defined routes match.
const NotFoundPage = lazy(() => import('../pages/NotFound'))

/**
 * Route Configuration Array
 * 
 * Each object in this array defines a route with two primary properties:
 * - path: The URL path pattern that matches the user's address bar.
 * - element: The React component instance to render when the path matches.
 */
const routes = [
  {
    // The root path represents the Dashboard page.
    path: '/',
    // Renders the lazy-loaded Dashboard page component.
    element: <DashboardPage />,
  },
  {
    // The path '/leads' maps to the Lead Management page.
    path: '/leads',
    // Renders the lazy-loaded Leads page component.
    element: <LeadsPage />,
  },
  {
    // The path '/analytics' maps to the Sales Analytics page.
    path: '/analytics',
    // Renders the lazy-loaded Analytics page component.
    element: <AnalyticsPage />,
  },
  {
    // The wild card '*' path matches any URL that was not matched by previous routes.
    path: '*',
    // Renders the lazy-loaded NotFound page component to handle 404 errors.
    element: <NotFoundPage />,
  },
]

// Export the routes configuration array as the default export.
export default routes
