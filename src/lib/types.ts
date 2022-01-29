import { HttpStatus } from './statusCodes'

export interface Application {
	id: string
	createdAt: string
	updatedAt: string
	name: string
	description: string
	logo?: string
	website?: string
	createdById: string
	members?: User[]
	_count?: {
		members?: number
		issues?: number
	}
	createdBy?: User
}

export interface Issue {
	id: string
	createdAt: string
	updatedAt: string
	number: number
	title: string
	description: string
	status: StatusType
	priority: PriorityType
	type: string

	createdById: string
	applicationId: string
	application: {
		name: string
	}
	createdBy: {
		name: string
		email: string
		id: string
	}
	_count?: {
		comments?: number
		assigned_to?: number
	}
}

export interface User {
	id: string
	name: string
	username: string
}

export interface PaginatedApiResponse<T extends any = any> {
	data: T[]
	pageInfo: PageInfo
	success: boolean
}

export interface ApiResponse<T extends any = any> {
	data: T
	success: boolean
}

export interface PageInfo {
	totalCount: number
	totalPage: number
	currentPage: number
	next: {
		page: number
		limit: number
	}
	previous?: {
		page: number
		limit: number
	}
}

export const Statii = [
	'OPEN',
	'IN_PROGRESS',
	'CLOSED',
	'BACKLOG',
	'TODO',
	'IN_REVIEW',
	'DONE',
	'CANCELLED',
] as const

export type StatusType = typeof Statii[number]

export const Priorities = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'] as const

export type PriorityType = typeof Priorities[number]

export interface Activity {
	text: string
	type: string
	createdAt: string
	id: string
	author: { name: string }
}
