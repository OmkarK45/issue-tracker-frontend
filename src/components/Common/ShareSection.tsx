import { SiFacebook, SiInstagram, SiTwitter } from 'react-icons/si'

export function ShareSection() {
	return (
		<div className="border-t border-gray-200 mt-10 pt-10">
			<h3 className="text-sm font-medium text-gray-900">Share</h3>
			<ul role="list" className="flex items-center space-x-6 mt-4">
				{/* map these */}
				<li>
					<a
						href="#"
						className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
					>
						<span className="sr-only">Share on Facebook</span>
						<SiFacebook className="w-6 h-6" />
					</a>
				</li>
				<li>
					<a
						href="#"
						className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
					>
						<span className="sr-only">Share on Instagram</span>
						<SiInstagram className="w-6 h-6" />
					</a>
				</li>
				<li>
					<a
						href="#"
						className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-500"
					>
						<span className="sr-only">Share on Twitter</span>
						<SiTwitter className="w-6 h-6" />
					</a>
				</li>
			</ul>
		</div>
	)
}
