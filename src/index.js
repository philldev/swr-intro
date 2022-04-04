import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { API_URL } from './helpers/api'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<SWRConfig
				value={{
					// refreshInterval: undefined,
					fetcher: (resource, init) =>
						fetch(API_URL + resource, init).then((res) => res.json()),
				}}
			>
				<App />
			</SWRConfig>
		</BrowserRouter>
	</React.StrictMode>
)
