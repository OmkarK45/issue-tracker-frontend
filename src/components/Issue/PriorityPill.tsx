import React from 'react'
import { AiFillWarning } from 'react-icons/ai'
import { PriorityType } from '~/lib/types'
import { Badge, Props } from '../ui/Badge'

// todo change these
const PRIORITY_ICON: Record<PriorityType, React.ElementType> = {
	URGENT: AiFillWarning,
	HIGH: AiFillWarning,
	MEDIUM: AiFillWarning,
	LOW: AiFillWarning,
}

const PRIORITY_COLOR: Record<PriorityType, Props['variant']> = {
	URGENT: 'red',
	HIGH: 'yellow',
	MEDIUM: 'orange',
	LOW: 'pink',
}

export function PriorityPill({ priority }: { priority: PriorityType }) {
	const Icon = PRIORITY_ICON[priority]

	return (
		<Badge
			className="flex items-center space-x-1 bg-opacity-30"
			variant={PRIORITY_COLOR[priority]}
			size="sm"
		>
			<Icon className="w-3 h-3" />
			{priority.toUpperCase()}
		</Badge>
	)
}
