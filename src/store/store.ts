import { useLayoutEffect } from 'react'
import create, { UseBoundStore } from 'zustand'
import createContext from 'zustand/context'
import { combine } from 'zustand/middleware'
import { Issue } from '~/lib/types'

let store: any

interface InitialState {
	count: number
	light: boolean
	lastUpdate: number
	issueList: Issue[]
}
type UseStoreState = typeof initializeStore extends (
	...args: never
) => UseBoundStore<infer T>
	? T
	: never

const initialState: InitialState = {
	lastUpdate: 0,
	light: false,
	count: 0,
	issueList: [],
}

const zustandContext = createContext<UseStoreState>()
export const Provider = zustandContext.Provider
export const useStore = zustandContext.useStore

export const initializeStore = (preloadedState = {}) => {
	return create(
		combine({ ...initialState, ...preloadedState }, (set, get) => ({
			setIssueList: (issueList: Issue[]) => {
				set({ issueList })
			},
			addNewIssue: (issue: Issue) => {
				console.log('ZUSTNAD STORE', issue)
				set({
					issueList: [...get().issueList, issue],
				})
			},
		}))
	)
}

export const useCreateStore = (initialState: InitialState) => {
	// For SSR & SSG, always use a new store.
	if (typeof window === 'undefined') {
		return () => initializeStore(initialState)
	}

	// For CSR, always re-use same store.
	store = store ?? initializeStore(initialState)
	// And if initialState changes, then merge states in the next render cycle.
	//
	// eslint complaining "React Hooks must be called in the exact same order in every component render"
	// is ignorable as this code runs in same order in a given environment
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useLayoutEffect(() => {
		if (initialState && store) {
			store.setState({
				...store.getState(),
				...initialState,
			})
		}
	}, [initialState])

	return () => store
}
