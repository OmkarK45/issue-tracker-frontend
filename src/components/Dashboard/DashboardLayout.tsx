import { useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { MobileSidebar } from './Sidebar/MobileSidebar'
import { Header } from './Header'

import { navigation } from './navigation'
import { Button } from '../ui/Button'
import { CreateIssueModal } from '../Issue/CreateIssueModal'
import { useModal } from '../ui/Modal'
import { Heading } from '../ui/Heading'
import { Link } from '../ui/Link'

export function DashboardLayout({
	defaultTab,
	application,
	children,
}: {
	defaultTab: string
	application: string
	children?: React.ReactNode
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	// const [createIssueModal, setCreateIssueModal] = useState(false)
	const router = useRouter()
	const createIssueModal = useModal()

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
				<CreateIssueModal
					isOpen={createIssueModal.props.open}
					onClose={createIssueModal.close}
				/>
				{/* Static sidebar for desktop */}
				<div className="hidden md:flex  md:flex-shrink-0">
					<div className="flex flex-col  w-64">
						{/* Sidebar component, swap this element with another sidebar if you like */}
						<div className=" flex  flex-col flex-grow border-r border-gray-200 pt-5  bg-gray-900 overflow-y-auto">
							<div className="flex items-center px-4 text-center">
								<Heading size="h5" className="text-white -mb-1 ">
									SimpleIssue
								</Heading>
							</div>
							<div className="mt-5 flex-grow flex flex-col">
								<Tab.List className="flex-1 px-2 bg-gray-800 space-y-1 py-3 top-0 bottom-0">
									<Button onClick={createIssueModal.open} size="lg" fullWidth>
										New Issue
									</Button>
									{navigation.map((item) => (
										<Tab
											key={item.name}
											className={({ selected }) =>
												clsx(
													selected
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
							<div className="my-3 text-center">
								<Link href={`/my-apps`} className="text-white">
									{`<<`} Back to all apps
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col w-0 flex-1 overflow-hidden bg-white">
					<Header setSidebarOpen={setSidebarOpen} />

					<Tab.Panels>
						<main className="flex-1 relative focus:outline-none h-screen overflow-y-scroll">
							{!children &&
								navigation.map((panel, index) => {
									return <Tab.Panel key={index}>{panel.component}</Tab.Panel>
								})}
							<div>{children}</div>
						</main>
					</Tab.Panels>
				</div>
			</Tab.Group>
		</div>
	)
}
