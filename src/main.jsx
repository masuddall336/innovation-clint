
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Sustainability from './components/sastainability/Sustainability.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
import Contactus from './components/contactus/Contactus.jsx'
import Qc_Qa from './components/qc&qa/Qc_Qa.jsx'
import Products from './components/products/Products.jsx'
import Gallery from './components/gallery/Gallery.jsx'
import { HelmetProvider } from 'react-helmet-async'
import Sitemap from './components/sitemap/Sitemap.jsx'
import Login from './login/Login.jsx'
import Register from './login/Register.jsx'
import AuthProvider from './firebase/AuthProvider.jsx'
import AddProducts from './add-products-form/AddProducts.jsx'
import LoadData from './components/products/LoadData.jsx'
import UpdateProductForm from './add-products-form/UpdateProductForm.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import CookiePolicy from './components/CookiePolicy.jsx'
import Video from './components/video/Video.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL;

const queryClient = new QueryClient()

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

