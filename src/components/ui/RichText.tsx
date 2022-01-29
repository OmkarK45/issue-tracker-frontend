// RichText.tsx in your components folder
import dynamic from 'next/dynamic'
import { Spinner } from './Spinner'

export default dynamic(() => import('@mantine/rte'), {
	// Disable during server side rendering
	ssr: false,

	// Render anything as fallback on server, e.g. loader or html content without editor
	loading: () => <Spinner className="w-5 h-5" />,
})