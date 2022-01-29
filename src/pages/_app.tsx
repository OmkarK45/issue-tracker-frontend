import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'
import { polyfill } from 'interweave-ssr'

import fetchJson from '../lib/fetchJson'
import { NProgress } from '~/components/ui/NProgress'
import { toastOptions } from '~/lib/toastOptions'
import { ThemeProvider } from 'next-themes'

import { Provider, useCreateStore } from '~/store/store'

if (typeof window === 'undefined') {
	polyfill()
}

function MyApp({ Component, pageProps }: AppProps) {
	const createStore = useCreateStore(pageProps.initialZustandState)
	return (
		<Provider createStore={createStore}>
			<SWRConfig
				value={{
					fetcher: fetchJson,
					onError: (err) => {
						console.error(err)
					},
				}}
			>
				<ThemeProvider storageKey="preferred-theme" attribute="class">
					<NProgress />
					<Toaster position="bottom-right" toastOptions={toastOptions} />
					<Component {...pageProps} />
				</ThemeProvider>
			</SWRConfig>
		</Provider>
	)
}
export default MyApp
