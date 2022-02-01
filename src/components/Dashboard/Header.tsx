import { MenuAlt2Icon, SearchIcon } from '@heroicons/react/outline'
import { Link } from '../ui/Link'
import { Logo } from '../ui/Logo'

export function Header({
	setSidebarOpen,
}: {
	setSidebarOpen: (open: boolean) => void
}) {
	return (
		<div className="relative z-10 flex-shrink-0 flex h-16 md:h-0 bg-white shadow">
			<button
				type="button"
				className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
				onClick={() => setSidebarOpen(true)}
			>
				<span className="sr-only">Open sidebar</span>
				<MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
			</button>
			<div className="w-full flex items-center ml-20">
				<Link href="/" className="lg:hidden no-underline">
					<span className="flex items-center space-x-2">
						<h5 className="mt-1 text-xl font-bold tracking-tighter">
							SimpleIssue
						</h5>
					</span>
				</Link>
			</div>
		</div>
	)
}
