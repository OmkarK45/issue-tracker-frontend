import clsx from 'clsx'
import { matchSorter } from 'match-sorter'
import React from 'react'
import {
	Column,
	useAsyncDebounce,
	useFilters,
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table'
import { ColumnDetails } from './IssueListWrapper'

export function IssueTable({
	columns,
	data,
}: {
	columns: Column<Record<string, string>>[]
	data: ColumnDetails[]
}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, ...rest },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 20, pageIndex: 0 },
		},
		useSortBy,
		usePagination
	)

	return (
		<>
			<table
				{...getTableProps()}
				className="min-w-full divide-y divide-gray-200"
			>
				<thead className="bg-gray-50">
					{headerGroups.map((headerGroup, index) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index2) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									key={index2}
								>
									{column.render('Header')}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row)
						return (
							<tr
								{...row.getRowProps()}
								key={index}
								className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
							>
								{row.cells.map((cell, index2) => {
									return (
										<td
											{...cell.getCellProps()}
											key={index2}
											className={clsx(
												'px-6 py-4 truncate max-w-sm whitespace-nowrap text-sm font-medium text-gray-900'
											)}
										>
											{cell.render('Cell')}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
