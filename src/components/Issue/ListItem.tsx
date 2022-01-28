export function ListItem({
	icon,
	label,
}: {
	icon: React.ElementType
	label: string
}) {
	const Icon = icon
	return (
		<div className="flex items-center space-x-2">
			<Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
			<span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
				{label}
			</span>
		</div>
	)
}
