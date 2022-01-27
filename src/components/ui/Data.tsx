/*
The `Data` component is a simple wrapper around the `JSON.stringify` function. It takes the `data`
prop and renders it as a JSON string.
*/
export function Data({ data }: { data: any }) {
	return (
		<div className="dark:bg-gray-900 container max-w-7xl mx-auto max-h-80 overflow-y-scroll">
			<pre>
				<code>
					<div className="text-sm monolisa">
						{JSON.stringify(data, null, 2)}
					</div>
				</code>
			</pre>
		</div>
	)
}
