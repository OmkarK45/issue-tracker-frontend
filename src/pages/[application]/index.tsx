import {
	CalendarIcon,
	CubeIcon,
	ExternalLinkIcon,
	UserIcon,
	UsersIcon,
} from '@heroicons/react/outline'
import { format } from 'date-fns'
import { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import router from 'next/router'
import { RiErrorWarningLine, RiUserUnfollowLine } from 'react-icons/ri'
import useSWR from 'swr'
import { ListCard } from '~/components/Application/ListCard'
import { RemoveMemberModal } from '~/components/Application/RemoveMemberModal'
import { PageHeader } from '~/components/Common/PageHeader'
import { ListItem } from '~/components/Issue/ListItem'
import { Navbar } from '~/components/Nav/DesktopNav'
import { ErrorFallback } from '~/components/ui/Fallbacks/ErrorFallback'
import { Spinner } from '~/components/ui/Spinner'
import { fetcher } from '~/lib/fetchJson'
import { Application } from '~/lib/types'
import useUser from '~/lib/useUser'

const DeleteApplicationModal = dynamic<{}>(
	() =>
		import('~/components/Application/DeleteApplicationModal').then(
			(x) => x.DeleteApplicationModal
		),
	{ loading: () => <Spinner /> }
)

const AddMemberModal = dynamic<{}>(
	() =>
		import('~/components/Application/AddMemberModal').then(
			(x) => x.AddMemberModal
		),
	{ loading: () => <Spinner /> }
)

interface Props {
	application: Application
}

export default function ApplicationDetailPage({ application }: Props) {
	const { user } = useUser({
		redirectTo: `/auth/login?redirect=/${application.id}`,
	})

	const { data } = useSWR(`/app/${application.id}`, fetcher, {
		fallbackData: application,
	})
	return (
		<div>
			<Navbar />
			<PageHeader
				title={application?.name}
				subtitle={`${application?._count?.issues} Issues | ${application?._count?.members} Members in organization`}
			/>
			<div className="container pt-6 max-w-7xl mx-auto">
				<div className="flex flex-wrap">
					<div className="md:w-1/4 w-full relative">
						<img
							className="absolute bg-white w-16  rounded-full"
							style={{
								left: '50%',
								transform: 'translateX(-50%) translateY(-50%)',
							}}
							src={application.logo ?? 'https://via.placeholder.com/150'}
							alt="App logo"
						/>
						<div className=" bg-white py-6 border space-y-4 border-gray-200 dark:border-gray-700 h-full  dark:bg-gray-800 rounded">
							<p className="text-xl mt-6 font-semibold leading-5 px-8 text-gray-800 dark:text-gray-100 ">
								Application Info
							</p>
							<div className="px-8 space-y-4">
								<ListItem icon={CubeIcon} label={application.name} />
								<ListItem
									icon={UserIcon}
									label={`Created By - ${application.createdBy?.name}`}
								/>
								<ListItem
									icon={CalendarIcon}
									label={`Date Created - ${format(
										new Date(application.createdAt),
										'MMM dd, yyyy'
									)}`}
								/>
								<ListItem
									icon={ExternalLinkIcon}
									label={application?.website ?? 'No URL available'}
								/>
							</div>
							<p className="text-xl mt-6 font-semibold leading-5 px-8 text-gray-800 dark:text-gray-100 ">
								Users ({application._count?.members})
							</p>
							<div className="px-8 overflow-auto space-y-4 mt-5">
								{application._count?.members === 0 && (
									<ErrorFallback
										noAction
										message="This organization does not have members."
									/>
								)}
								{application?.members?.map((member) => {
									return (
										<ListItem
											icon={UsersIcon}
											label={`${member.name} - @${member.username}`}
										/>
									)
								})}
							</div>
							<div className="px-8">
								<DeleteApplicationModal />
							</div>
						</div>
					</div>
					<div className="md:w-3/4 w-full pb-6 md:pb-0 md:pr-6 md:pl-3 space-y-3">
						<ListCard
							title="View Issues"
							description="View All Issues"
							icon={RiErrorWarningLine}
							onClick={() => router.push(`/${application.id}/all-issues`)}
						/>
						<AddMemberModal />
						<RemoveMemberModal />
					</div>
				</div>
			</div>
		</div>
	)
}

ApplicationDetailPage.getInitialProps = async (ctx: NextPageContext) => {
	try {
		const applicationResponse = await fetcher(`/app/${ctx.query.application}`, {
			method: 'GET',
			headers: {
				cookie: ctx.req?.headers.cookie ?? '',
			},
		})

		return {
			application: applicationResponse.data,
		}
	} catch (err) {
		console.log(err)
		return {
			application: null,
		}
	}
}
