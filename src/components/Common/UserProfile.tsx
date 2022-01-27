import { AiOutlineSmile } from 'react-icons/ai'
interface UserProfileProps {
	name: string
	avatar: string
}

export function UserProfile({ name, avatar }: UserProfileProps) {
	return (
		<div className="flex-shrink-0 flex  py-4">
			<div className="flex-shrink-0 group block">
				<div className="flex items-center">
					<div className="bg-pink-200 dark:bg-pink-700 p-2 rounded-full">
						<AiOutlineSmile className="inline-block h-7 w-7 rounded-full" />
					</div>
					<div className="ml-3">
						<p className="text-base font-medium text-gray-700 dark:text-gray-200 ">
							{name}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
