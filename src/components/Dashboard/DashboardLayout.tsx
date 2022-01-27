import { useState } from 'react'
import { Tab } from '@headlessui/react'
import {
	CalendarIcon,
	ChartBarIcon,
	FolderIcon,
	HomeIcon,
	InboxIcon,
	UsersIcon,
} from '@heroicons/react/outline'
import { MobileSidebar } from './Sidebar/MobileSidebar'
import { Header } from './Header'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import {
	ArchiveIcon,
	ClockIcon,
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

export function DashboardLayout({
	defaultTab,
	application,
}: {
	defaultTab: string
	application: string
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const router = useRouter()

	function handleChange(idx: number) {
		const path = '/' + application + '/' + navigation[idx].href.query.tab
		router.push(path, undefined, {
			shallow: true,
		})
	}

	return (
		<div className="h-screen flex overflow-hidden bg-gray-100">
			<Tab.Group
				defaultIndex={navigation.findIndex(
					(x) => x.href.query.tab === defaultTab
				)}
				onChange={(idx) => handleChange(idx)}
				vertical
			>
				<MobileSidebar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:flex-shrink-0">
					<div className="flex flex-col w-64">
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
							<div className="flex items-center flex-shrink-0 px-4">
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
									alt="Workflow"
								/>
							</div>
							<div className="mt-5 flex-grow flex flex-col">
								<Tab.List className="flex-1 px-2 bg-white space-y-1">
									{navigation.map((item) => (
										<Tab
											key={item.name}
											className={({ selected }) =>
												clsx(
													selected
														? 'bg-gray-100 text-gray-900'
														: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
													'group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md'
												)
											}
										>
											{item.name}
										</Tab>
									))}
								</Tab.List>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-0 flex-1 overflow-hidden">
					<Header setSidebarOpen={setSidebarOpen} />

					<Tab.Panels>
						<main className="flex-1 relative overflow-y-auto focus:outline-none">
							<div className="py-6">
								{navigation.map((panel, index) => {
									return <Tab.Panel key={index}>{panel.component}</Tab.Panel>
								})}
							</div>
						</main>
					</Tab.Panels>
				</div>
			</Tab.Group>
		</div>
	)
}
