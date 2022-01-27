import { Hero } from '~/components/Common/Hero'
import { Navbar } from '~/components/Nav/DesktopNav'
import { SEO } from '~/components/SEO'

export default function LandingPage() {
	return (
		<>
			<SEO
				title="Simple Issue | Track your issues (your product's)."
				description="Track and manage ongoing product issues."
				image="https://i.imgur.com/nyx2LXF.png"
				cardType="summary_large_image"
				path="/"
			/>
			<Navbar />
			<Hero />
		</>
	)
}
