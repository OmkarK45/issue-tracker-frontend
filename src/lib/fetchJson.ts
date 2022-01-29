import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL

axios.defaults.withCredentials = true

export { axios }

export const fetcher = <T = any>(
	url: string,
	options?: AxiosRequestConfig<any> | undefined
): Promise<T> => {
	return axios
		.get<T | any>(BASE_URL + url, {
			...options,
			withCredentials: true,
		})
		.then((res) => res.data)
}

export const mutationFn = <T extends any = any>(
	url: string,
	data: T,
	options?: AxiosRequestConfig<any> | undefined
) =>
	axios
		.post(BASE_URL + url, data, {
			...options,
			withCredentials: true,
		})
		.then((res) => res.data)

export default async function fetchJson<JSON = unknown>(
	input: RequestInfo,
	init?: RequestInit
): Promise<JSON> {
	const response = await fetch(input, {
		...init,
		credentials: 'include',
	})

	// if the server replies, there's always some data in json
	// if there's a network error, it will throw at the previous line
	const data = await response.json()

	// response.ok is true when res.status is 2xx
	// https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
	if (response.ok) {
		return data
	}

	throw new FetchError({
		message: response.statusText,
		response,
		data,
	})
}

export class FetchError extends Error {
	response: Response
	data: {
		message: string
	}
	constructor({
		message,
		response,
		data,
	}: {
		message: string
		response: Response
		data: {
			message: string
		}
	}) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(message)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, FetchError)
		}

		this.name = 'FetchError'
		this.response = response
		this.data = data ?? { message: message }
	}
}

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie/'
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
export const TMDB_API_KEY = process.env.TMDB_API_KEY
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/'

export const tmdBFetcher = <T = any>(
	imdb_id: string,
	options: AxiosRequestConfig<any> | undefined
): Promise<T> => {
	return axios
		.get<T | any>(
			TMDB_BASE_URL +
				imdb_id +
				'/credits' +
				`?api_key=448845c1c0a389a49d089ad74d9160d5`,
			{
				...options,
				headers: {
					'Content-Type': 'application/json',
				},
				params: {
					api_key: process.env.TMDB_API_KEY,
				},
				withCredentials: false,
			}
		)
		.then((res) => res.data)
}
