import { Button } from '../ui/Button'

export function CTA() {
	return (
		<section className="w-full  pt-24 pb-32">
			<div className="relative  px-12 mx-auto max-w-7xl">
				<div className="relative  items-center p-12 overflow-hidden shadow-2xl md:p-16 lg:p-20 xl:p-24 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-2xl  lg:gap-0">
					<div className="absolute top-0 right-0">
						<svg
							viewBox="0 0 487 487"
							className="object-cover w-full h-full"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
								fill="#FFF"
								fillRule="nonzero"
								fillOpacity=".1"
							></path>
						</svg>
					</div>

					<div className="absolute bottom-0 left-0 h-full">
						<svg
							viewBox="0 0 487 487"
							className="w-auto h-full opacity-75 object-stretch"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
								fill="#FFF"
								fillRule="nonzero"
								fillOpacity=".1"
							></path>
						</svg>
					</div>

					<div className="relative z-30 ">
						<h2 className="mb-1 text-3xl font-bold leading-tight text-white md:mb-3 md:text-3xl lg:text-4xl xl:text-5xl">
							Ready to get started?{' '}
						</h2>
						<p className="max-w-sm my-6 text-base font-normal text-pink-200 xl:max-w-lg lg:pr-0 pr-7 lg:text-xl">
							Amazing teams use amazing internal tools. SimpleIssue would make
							your engineering team go from 1x to 10x in produtivity!
						</p>
						<Button size="xl" href="/auth/login">
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
