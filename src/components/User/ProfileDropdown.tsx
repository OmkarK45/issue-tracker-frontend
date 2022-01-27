import router from 'next/router'
import toast from 'react-hot-toast'
import {
	HiOutlineChevronDown,
	HiOutlineHome,
	HiOutlineLogout,
	HiOutlinePlay,
	HiOutlineVideoCamera,
} from 'react-icons/hi'
import fetchJson from '~/lib/fetchJson'
import useUser from '~/lib/useUser'
import { Menu, MenuItem } from '../ui/Dropdown'

export function ProfileDropdown() {
	const { user, mutateUser } = useUser({
		redirectIfFound: false,
	})

	async function handleLogout() {
		mutateUser(await fetchJson('/api/logout', { method: 'POST' }), false)
		toast.success('You have been logged out. You will be redirected to home.')
		router.push('/')
	}

	return (
		<Menu
			dropdown={
				<>
					<MenuItem
						href={'/products'}
						icon={<HiOutlineHome className="w-5 h-5" />}
					>
						Home
					</MenuItem>
					<MenuItem
						href={`/favorites`}
						icon={<HiOutlinePlay className="w-5 h-5" />}
					>
						Favorites
					</MenuItem>
					<MenuItem
						href={`/my-playlists`}
						icon={<HiOutlineVideoCamera className="w-5 h-5" />}
					>
						My Playlists
					</MenuItem>

					<MenuItem
						onClick={handleLogout}
						icon={<HiOutlineLogout className="w-5 h-5" />}
					>
						Signout
					</MenuItem>
				</>
			}
			dropdownClassName="mr-5 mt-6"
		>
			<span className="font-medium capitalize text-base flex items-center space-x-1">
				<HiOutlineChevronDown /> <p>Hi, {user?.data.user?.name}!</p>
			</span>
		</Menu>
	)
}
