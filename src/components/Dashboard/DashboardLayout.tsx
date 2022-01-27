import { useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { MobileSidebar } from './Sidebar/MobileSidebar'
import { Header } from './Header'

import { navigation } from './navigation'

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
		console.log('inidex', idx)
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
					application={application}
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
											<item.icon className="mr-3 flex-shrink-0 h-6 w-6" />
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
							{navigation.map((panel, index) => {
								return <Tab.Panel key={index}>{panel.component}</Tab.Panel>
							})}
						</main>
					</Tab.Panels>
				</div>
			</Tab.Group>
		</div>
	)
}
