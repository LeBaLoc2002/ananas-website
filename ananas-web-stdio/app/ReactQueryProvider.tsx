'use client'
import store from '@/src/redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()

export default function ReactQueryProvider({children}:{children: React.ReactNode} ){
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
      </Provider>
  </QueryClientProvider>
  )
}
