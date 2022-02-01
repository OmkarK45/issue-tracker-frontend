import { Dialog, Tab, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { navigation } from '../navigation'
import clsx from 'clsx'
import { Link } from '~/components/ui/Link'
import { Heading } from '~/components/ui/Heading'

interface Props {
	sidebarOpen: boolean
	setSidebarOpen: (sidebarOpen: boolean) => void
	application: string
}
export function MobileSidebar({
	sidebarOpen,
	setSidebarOpen,
	application,
}: Props) {
	return (
		<Transition.Root show={sidebarOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 flex z-40 md:hidden"
				onClose={setSidebarOpen}
			>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
				</Transition.Child>
				<Transition.Child
					as={Fragment}
					enter="transition ease-in-out duration-300 transform"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transition ease-in-out duration-300 transform"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 text-white bg-gray-900">
						<Transition.Child
							as={Fragment}
							enter="ease-in-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in-out duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="absolute top-0 right-0 -mr-12 pt-2">
								<button
									type="button"
									className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
									onClick={() => setSidebarOpen(false)}
								>
									<span className="sr-only">Close sidebar</span>
									<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
								</button>
							</div>
						</Transition.Child>
						<div className="flex items-center px-4 text-center">
							<Heading size="h5" className="text-white -mb-1 ">
								SimpleIssue
							</Heading>
						</div>
						<div className="mt-5 flex-1 h-0 overflow-y-auto">
							<div className="px-2 space-y-1">
								{navigation.map((item) => (
									<Link
										href={'/' + application + '/' + item.href.query.tab}
										key={item.name}
										className={clsx(
											'group flex items-center px-2 py-2 text-base font-medium no-underline rounded-md'
										)}
									>
										{item.name}
									</Link>
								))}
								<Link
									href="/my-apps"
									className={clsx(
										'group flex items-center px-2 py-2 text-base font-medium  rounded-md'
									)}
								>
									{`<<`} Back to my apps
								</Link>
							</div>
						</div>
					</div>
				</Transition.Child>
				<div className="flex-shrink-0 w-14" aria-hidden="true">
					{/* Dummy element to force sidebar to shrink to fit close icon */}
				</div>
			</Dialog>
		</Transition.Root>
	)
}
