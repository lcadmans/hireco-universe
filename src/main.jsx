import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
// import Mesh from './Mesh'
// import Primary from './Primary'
import App from './App'
import './styles/global.css'
import '/fonts/Eveleth Clean Thin.otf'
import '/fonts/Eveleth Clean Regular.otf'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Suspense fallback={null}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</Suspense>
	</React.StrictMode>
)
