import { AiOutlineSmile } from 'react-icons/ai'

export function MemberList({ name }: { name: string }) {
	return (
		<li className="flex justify-start">
			<span className="flex items-center space-x-3">
				<div className="flex-shrink-0">
					<AiOutlineSmile className="h-5 w-5 rounded-full" />
				</div>
				<div className="text-sm font-medium text-gray-900">{name}</div>
			</span>
		</li>
	)
}
