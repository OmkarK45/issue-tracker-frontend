import {
	ArchiveIcon,
	ClockIcon,
	HomeIcon,
	UserCircleIcon,
	ViewListIcon,
} from '@heroicons/react/outline'
import { IconType } from 'react-icons/lib'

interface Navigation {
	name: string
	href: {
		pathname: string
		query: {
			tab: string
		}
	}
	icon: IconType | React.ElementType
	component: React.ReactNode
}

export const navigation: Array<Navigation> = [
	{
		name: 'All Issues',
		href: {
			pathname: '/[tab]',
			query: {
				tab: 'all-issues',
			},
		},
		icon: HomeIcon,
		component: () => <h1>ok</h1>,
	},
	{
		name: 'My Issues',
		href: {
			pathname: '/[tab]',
			query: {
				tab: 'my-issues',
			},
		},
		icon: ViewListIcon,
		component: () => <h1>o2k</h1>,
	},
	{
		name: 'Assigned',
		href: {
			pathname: '/[tab]',
			query: {
				tab: 'assigned',
			},
		},
		icon: UserCircleIcon,
		component: () => <h1>o3k</h1>,
	},
	{
		name: 'Closed',
		href: {
			pathname: '/[tab]',
			query: {
				tab: 'closed',
			},
		},
		icon: ArchiveIcon,
		component: () => <h1>o4k</h1>,
	},
	{
		name: 'Recent',
		href: {
			pathname: '/[tab]',
			query: {
				tab: 'recent',
			},
		},
		icon: ClockIcon,
		component: () => <h1>o5k</h1>,
	},
]
