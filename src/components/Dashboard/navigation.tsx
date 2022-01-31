import { ArchiveIcon, HomeIcon, ViewListIcon } from '@heroicons/react/outline'
import { IconType } from 'react-icons/lib'
import { AllIssues } from '../Issue/AllIssues'
import { ClosedIssues } from '../Issue/ClosedIssues'
import { MyIssues } from '../Issue/MyIssues'

interface Navigation {
	name: string
	href: {
		pathname: string
		query: {
			tab: string
			pageIndex?: string
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
				pageIndex: `1`,
			},
		},
		icon: HomeIcon,
		component: () => <AllIssues />,
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
		component: () => <MyIssues />,
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
		component: () => <ClosedIssues />,
	},
]
