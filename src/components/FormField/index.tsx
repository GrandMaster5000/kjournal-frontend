import { TextField } from '@material-ui/core';
import { useFormContext } from 'react-hook-form'

interface FormFieldProps {
	name: string;
	label: string;
}

export const FormField = ({ name, label }: FormFieldProps) => {
	const { register, formState } = useFormContext();

	return (
		<TextField
			className="mb-20"
			size="small"
			label={label}
			variant="outlined"
			fullWidth
			error={!!formState.errors[name]?.message}
			helperText={formState.errors[name]?.message}
			{...register(name)}
		/>
	)
}