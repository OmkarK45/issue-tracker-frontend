import { Button } from '../ui/Button'

export function Hero() {
	return (
		<>
			<div className="md:mt-16 mx-auto max-w-7xl px-4 sm:px-6">
				<div className="text-center">
					<h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
						<span className="block">Track Issues. Ship Faster.</span>
					</h1>
					<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
						Use Simple Issue to manage issues right from the creation till the
						resolution.
					</p>
				</div>
			</div>
			<div className="my-10 space-x-3 flex items-center justify-center">
				<Button href="/org/all-issues" size="xl">
					Try For Free
				</Button>
				<Button size="xl" variant="ghost">
					{`>`} See Demo App
				</Button>
			</div>
			<div className="relative md:mt-16">
				<div className="absolute inset-0 flex flex-col" aria-hidden="true">
					<div className="flex-1" />
					<div className="flex-1 w-full bg-gray-800" />
				</div>
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<img
						className="relative rounded-lg shadow-lg"
						src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg"
						alt="App screenshot"
					/>
				</div>
			</div>
		</>
	)
}
