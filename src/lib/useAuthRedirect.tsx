import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
	const router = useRouter()
	return () => {
		router.push((router.query.redirect as string) ?? '/')
	}
}
