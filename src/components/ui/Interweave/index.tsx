import BaseInterwave, {
	InterweaveProps as BaseInterwaveProps,
} from 'interweave'
import { HashtagMatcher, UrlMatcher } from 'interweave-autolink'
import { useRouter } from 'next/router'
import { Url } from './UrlFactory'

export const urlMatcher = new UrlMatcher(
	'url',
	{
		customTLDs: ['app'],
	},
	Url
)

export const hashTagMatcher = new HashtagMatcher('hashtag', {}, (args) => {
	const router = useRouter()

	function handleOnClick() {
		router.push(`/${args.hashtag.split('#')[1]}`)
	}

	return (
		<button className="font-medium underline" onClick={handleOnClick}>
			{args.hashtag}
		</button>
	)
})

export function Interweave({
	content,
	matchers = [urlMatcher, hashTagMatcher],
	...props
}: BaseInterwaveProps) {
	return (
		<BaseInterwave
			content={content}
			matchers={matchers}
			{...props}
			newWindow
			hashtagUrl={(hashtag: string) => `/hashtags/${hashtag}`}
		/>
	)
}
