import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'

import fetchJson from '../lib/fetchJson'
import { NProgress } from '~/components/ui/NProgress'
import { toastOptions } from '~/lib/toastOptions'
import { Footer } from '~/components/Common/Footer'
import { GradientBar } from '~/components/ui/GradientBar'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
	return (
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
	)
}
export default MyApp
