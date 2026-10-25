
import { createRoot } from 'react-dom/client'
import './index.css'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './firebase/AuthProvider.jsx'
import Video from './components/video/Video.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
})

const App = lazy(() => import('./App.jsx'))
const Sustainability = lazy(() => import('./components/sastainability/Sustainability.jsx'))
const Contactus = lazy(() => import('./components/contactus/Contactus.jsx'))
const Qc_Qa = lazy(() => import('./components/qc&qa/Qc_Qa.jsx'))
const Products = lazy(() => import('./components/products/Products.jsx'))
const Gallery = lazy(() => import('./components/gallery/Gallery.jsx'))
const Sitemap = lazy(() => import('./components/sitemap/Sitemap.jsx'))
const Login = lazy(() => import('./login/Login.jsx'))
const Register = lazy(() => import('./login/Register.jsx'))
const AddProducts = lazy(() => import('./add-products-form/AddProducts.jsx'))
const LoadData = lazy(() => import('./components/products/LoadData.jsx'))
const UpdateProductForm = lazy(() => import('./add-products-form/UpdateProductForm.jsx'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy.jsx'))
const CookiePolicy = lazy(() => import('./components/CookiePolicy.jsx'))

let router = createBrowserRouter([
  {
    path: "",
    Component: Root,
    children: [
      {
        index: true,
        Component: App
      },
      {
        path: '/sustainability',
        Component: Sustainability
      },
      {
        path: '/contact-us',
        Component: Contactus
      },
      {
        path: '/qc-qa',
        Component: Qc_Qa
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: '/gallery',
        Component: Gallery
      },
      {
        path: 'sitemap',
        Component: Sitemap
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/products/add-product',
        Component: AddProducts
      },
      {
        path: '/products/:id',
        loader: async ({ params }) => {
          const res = await fetch(`${API_URL}/products/${params.id}`);
          return res.json();
        },
        Component: LoadData
      },
      {
        path: '/edit-product/:id',
        loader: async ({ params }) => {
          const res = await fetch(`${API_URL}/products/${params.id}`);
          return res.json();
        },
        Component: UpdateProductForm
      },
      {
        path: '/Privacy-Policy',
        Component: PrivacyPolicy
      },
      {
        path: '/cookie-policy',
        Component: CookiePolicy
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <Video />
      <AuthProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
)

