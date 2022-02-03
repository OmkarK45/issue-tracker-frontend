import { Feature, Features } from '~/components/Common/Features'
import { Hero } from '~/components/Common/Hero'
import { Navbar } from '~/components/Nav/DesktopNav'
import { SEO } from '~/components/SEO'
import {
	CubeTransparentIcon,
	LightningBoltIcon,
	SparklesIcon,
	TableIcon,
	UsersIcon,
} from '@heroicons/react/outline'
import { BiInfinite } from 'react-icons/bi'
import { CTA } from '~/components/Common/CTA'
import { Footer } from '~/components/Common/Footer'

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
			<Features features={features} />
			<CTA />
			<div className="pb-10">
				<Footer />
			</div>
		</>
	)
}

export const features: Feature[] = [
	{
		color: { bg: 'bg-red-100', text: 'text-red-600' },
		title: 'For software teams',
		description: 'Created by a software engineer for software engineers.',
		icon: CubeTransparentIcon,
	},
	{
		color: { bg: 'bg-green-100', text: 'text-green-600' },
		title: 'Sleek UI',
		description: 'A sleek, minimalistic UI with a clean and modern look.',
		icon: SparklesIcon,
	},
	{
		title: 'Paginated Tables',
		description: 'You can go back to issues with the help of pagination.',
		color: { bg: 'bg-blue-100', text: 'text-blue-600' },
		icon: TableIcon,
	},
	{
		title: 'Infinite Applications',
		description: 'Create as many applications as you can! There is no limit.',
		color: { bg: 'bg-purple-100', text: 'text-purple-600' },
		icon: BiInfinite,
	},
	{
		title: 'Assign issues to team members',
		description: 'Assign issues to team members to track their progress.',
		color: { bg: 'bg-orange-100', text: 'text-orange-600' },
		icon: UsersIcon,
	},
	{
		title: 'Built for speed',
		description: "We've built Simple Issue to be fast and easy to use.",
		color: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
		icon: LightningBoltIcon,
	},
]
