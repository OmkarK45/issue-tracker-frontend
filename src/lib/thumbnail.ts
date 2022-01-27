type Quality = 'maxresdefault' | 'mqdefault' | 'hqdefault' | 'default'

export function getYoutubeThumbnail(video_id: string, quality?: Quality) {
	return 'https://img.youtube.com/vi/' + video_id + '/' + quality
		? '/' + quality
		: '/0.jpg'
}
