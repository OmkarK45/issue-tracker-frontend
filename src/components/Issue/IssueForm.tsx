import { Controller } from 'react-hook-form'
import { FaCheck } from 'react-icons/fa'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import Form from '../ui/Form/Form'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { PRIORITY, STATUS } from './CreateIssueModal'
import RichTextEditor from '../ui/RichText'

export function IssueForm({
	handleSubmit,
	form,
	mentions,
	onClose,
}: {
	handleSubmit: any
	form: any
	mentions: any
	onClose: any
}) {
	return (
		<Form form={form} onSubmit={handleSubmit}>
			<Input
				label="Issue title"
				placeholder="Something is not working."
				{...form.register('title')}
			/>
			<p className="block text-sm font-medium dark:text-white">
				Describe the issue
			</p>

			<Controller
				name="description"
				control={form.control}
				render={({ field: { onChange, value } }) => {
					return (
						// @ts-ignore
						<RichTextEditor
							controls={[
								['bold', 'italic', 'underline', 'strike'],
								['h1', 'h2', 'h3', 'h4'],
								['link', 'code'],
							]}
							mentions={mentions}
							className="font-sans"
							onChange={onChange}
							value={value}
						/>
					)
				}}
			/>
			<div className="flex items-center space-x-2">
				<div className="flex-1">
					<Controller
						name="priority"
						control={form.control}
						render={({ field: { onChange, value } }) => {
							return (
								<Select
									onChange={onChange}
									value={value}
									label="Choose priority of the issue."
								>
									<Select.Button
										label={value ? value.label : 'Select'}
										variant={value ? 'default' : 'placeholder'}
									/>
									<Select.Options>
										{Object.entries(PRIORITY).map(([key, props]) => (
											<Select.Option
												key={key}
												value={props}
												label={props.label}
												selectedIcon={<FaCheck />}
											/>
										))}
									</Select.Options>
								</Select>
							)
						}}
					/>
				</div>
				<div className="flex-1">
					<Controller
						name="status"
						control={form.control}
						render={({ field: { onChange, value } }) => {
							return (
								<Select
									onChange={onChange}
									value={value}
									label="Choose status of the issue"
								>
									<Select.Button
										label={value ? value.label : 'Select'}
										variant={value ? 'default' : 'placeholder'}
									/>
									<Select.Options>
										{Object.entries(STATUS).map(([key, props]) => (
											<Select.Option
												key={key}
												value={props}
												label={props.label}
												selectedIcon={<FaCheck />}
											/>
										))}
									</Select.Options>
								</Select>
							)
						}}
					/>
				</div>
			</div>
			<Card.Body className="flex justify-end space-x-3">
				<Button onClick={onClose} size="lg" variant="dark">
					Cancel
				</Button>
				<Form.SubmitButton size="lg" type="submit">
					Submit
				</Form.SubmitButton>
			</Card.Body>
		</Form>
	)
}
