import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { MenuIcon, SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

import useUser from '~/lib/useUser'

import { MobileMenu } from './MobileMenu'
import { ProfileDropdown } from '../User/ProfileDropdown'

import { GradientBar } from '../ui/GradientBar'
import { Link } from '../ui/Link'
import { ThemeToggle } from '../ui/ThemeSwitcher'
import { useRouter } from 'next/router'
import { SearchBar } from '../Search/SearchBar'

export function Navbar() {
	const router = useRouter()
	const { user } = useUser({
		redirectIfFound: false,
	})

	const [open, setOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)

	return (
		<div>
			{/* Mobile menu */}
			<MobileMenu open={open} setOpen={setOpen} />

			<header className="relative">
				<nav aria-label="Top">
					{!user?.isLoggedIn && (
						<div>
							<div className="mx-auto max-w-7xl h-10 px-4 flex items-center justify-between sm:px-6 lg:px-0">
								<div className="flex items-center space-x-6">
									<Link
										href="/auth/login"
										className="-m-2 p-2 block font-medium no-underline"
									>
										Sign in
									</Link>
									<Link
										href="/auth/signup"
										className="-m-2 p-2 block font-medium no-underline"
									>
										Create an account
									</Link>
								</div>
							</div>
						</div>
					)}
					{/* Secondary navigation */}
					<div>
						<div className="md:max-w-7xl px-6 lg:px-0 mx-auto ">
							<div>
								<div className="h-16 flex items-center justify-between">
									{/* Logo (lg+) */}
									<div className="hidden lg:flex-1 lg:flex lg:items-center">
										<Link
											href="/"
											className="flex items-center space-x-2 no-underline"
										>
											<h6 className="mt-1  text-2xl font-bold tracking-tight">
												SimpleIssue
											</h6>
										</Link>
									</div>

									{/* Mobile menu and search (lg-) */}
									<div className="flex-1 flex items-center lg:hidden">
										<button
											type="button"
											className="-ml-2  p-2 rounded-md text-gray-400"
											onClick={() => setOpen(true)}
										>
											<MenuIcon className="h-6 w-6" aria-hidden="true" />
										</button>

										{/* Search */}
										<button
											className="p-2 ml-2"
											onClick={() => setSearchOpen((prev) => !prev)}
										>
											<SearchIcon
												className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
												aria-hidden="true"
											/>
										</button>
									</div>

									{/* Logo (lg-) */}
									<Link href="/" className="lg:hidden no-underline">
										<span className="flex items-center space-x-2">
											<h5 className="mt-1 text-xl font-bold tracking-tighter">
												SimpleIssue
											</h5>
										</span>
									</Link>

									<div className="flex-1 flex items-center justify-end space-x-3">
										<div className="hidden lg:block">
											{router.pathname !== '/' && <SearchBar />}
										</div>

										<div className="flex items-center lg:ml-8">
											{user?.isLoggedIn ? (
												<div className="hidden md:block ">
													<ProfileDropdown />
												</div>
											) : null}
										</div>
										<div>
											<ThemeToggle />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{searchOpen ? (
						<div
							className={clsx(
								'block md:hidden w-full py-2 px-3 transition-all duration-500 '
							)}
						>
							<SearchBar />
						</div>
					) : null}
				</nav>
			</header>
		</div>
	)
}
