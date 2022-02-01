import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Issue } from '~/lib/types'
import { useStore } from '~/store/store'
import { Footer } from '../Common/Footer'
import { Button } from '../ui/Button'
import { Interweave } from '../ui/Interweave'
import { Link } from '../ui/Link'
import { EditIssueModal } from './EditIssueModal'
import { IssueMetadata } from './IssueMetadata'

const IssueActivity = dynamic(() => import('./IssueActivity'), {
	ssr: false,
	loading: () => <p>Loading Issue Activity...</p>,
})

export function IssueDetail() {
	const issueDetail = useStore((state) => state.currentIssue) as Issue
	const router = useRouter()
	if (!issueDetail) return null
	return (
		<main className="flex-1 relative focus:outline-none">
			<div className="py-8 xl:py-10">
				<div className="max-w-3xl relative mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl xl:grid xl:grid-cols-3">
					<div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
						<Button
							variant="ghost"
							size="xs"
							className="mb-3"
							onClick={() => router.back()}
						>
							Back
						</Button>
						<div>
							<div>
								<div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
									<div>
										<span className="text-2xl flex items-center space-x-2 font-bold text-gray-900">
											<p>{issueDetail?.title}</p>
										</span>

										<p className="mt-2 text-sm text-gray-500">
											#{issueDetail?.number} opened by{' '}
											<b className="font-medium">
												{issueDetail?.createdBy.name}
											</b>
										</p>
									</div>
									<div className="mt-4 flex space-x-3 md:mt-0">
										<EditIssueModal issueDetail={issueDetail} />
									</div>
								</div>
								<div className="md:hidden">
									<IssueMetadata issueDetail={issueDetail} />
								</div>
								<div className="xl:pb-0">
									<h2 className="sr-only">Description</h2>
									<div className="prose max-w-none my-3">
										<Interweave content={issueDetail?.description} />
									</div>
								</div>
							</div>
							<div className="w-full my-32 relative ">
								<p className="font-medium mb-5">Activity</p>
								<IssueActivity />
							</div>
						</div>
					</div>
					<aside className="hidden xl:block  xl:pl-8">
						<IssueMetadata issueDetail={issueDetail} />
						<div className="text-gray-500 text-xs mt-5 text-left md:text-center">
							<p>&copy; SimpleIssue, {new Date().getFullYear()}</p>
							<a
								target="_blank"
								rel="noreferrer noopener"
								href="https://omkarkulkarni.vercel.app"
							>
								My Portfolio
							</a>
							<a
								className="ml-2"
								href="https://github.com/omkark45/issue-tracker-frontend"
							>
								Souce Code
							</a>
						</div>
					</aside>
				</div>
			</div>
		</main>
	)
}
