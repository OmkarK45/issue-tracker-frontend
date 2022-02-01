import { SearchIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { matchSorter } from 'match-sorter'
import React, { useState } from 'react'
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
		state: { pageIndex, pageSize, globalFilter, ...rest },
		visibleColumns,
		preGlobalFilteredRows,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 20, pageIndex: 0 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const TWO_HUNDRED_MS = 200

	function GlobalFilter({
		preGlobalFilteredRows,
		globalFilter,
		setGlobalFilter,
	}) {
		const [value, setValue] = useState(globalFilter)
		const onChange = useAsyncDebounce((value) => {
			setGlobalFilter(value || undefined)
		}, TWO_HUNDRED_MS)

		return (
			<div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
				<div className="flex-1 px-4 flex justify-between">
					<div className="flex-1 flex">
						<div className="w-full flex md:ml-0">
							<label htmlFor="search-field" className="sr-only">
								Search
							</label>
							<div className="relative w-full text-gray-400 focus-within:text-gray-600">
								<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
									<SearchIcon className="h-5 w-5" aria-hidden="true" />
								</div>
								<input
									value={value || ''}
									onChange={(e) => {
										setValue(e.target.value)
										onChange(e.target.value)
									}}
									placeholder={`Search`}
									className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			<table
				{...getTableProps()}
				className="min-w-full divide-y divide-gray-200"
			>
				<thead className="bg-gray-50">
					<tr>
						<th colSpan={visibleColumns.length}>
							<GlobalFilter
								preGlobalFilteredRows={preGlobalFilteredRows}
								globalFilter={globalFilter}
								setGlobalFilter={setGlobalFilter}
							/>
						</th>
					</tr>
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
								className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white '}
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
