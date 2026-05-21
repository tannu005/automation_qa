import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createServer } from 'miragejs'
import axios from 'axios'
import App from './App'
import makeServer from './server'

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api.realworld.show/api'
}

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(queryKey[0], { params: queryKey[1] })
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
})

if (window.Cypress && process.env.NODE_ENV === 'test') {
  const cyServer = createServer({
    routes() {
      ;['get', 'put', 'patch', 'post', 'delete'].forEach((method) => {
        this[method]('/*', (schema, request) => window.handleFromCypress(request))
      })
    },
  })
  cyServer.logging = false
} else if (import.meta.env.DEV) {
  makeServer({ environment: 'development' })
}

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
