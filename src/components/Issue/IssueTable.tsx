import { Column, usePagination, useTable } from 'react-table'
import { Data } from '../ui/Data'
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
		state: { pageIndex, pageSize },
	} = useTable(
		{ columns, data, initialState: { pageSize: 20, pageIndex: 0 } },
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
									{...column.getHeaderProps()}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									key={index2}
								>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, index) => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()} key={index}>
								{row.cells.map((cell, index2) => {
									return (
										<td
											{...cell.getCellProps()}
											key={index2}
											className="px-6 py-4 truncate max-w-sm whitespace-nowrap text-sm font-medium text-gray-900"
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
