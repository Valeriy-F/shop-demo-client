import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { MuiFileInput, MuiFileInputProps } from 'mui-file-input';

const FileInputField = (props: MuiFileInputProps<false>) => {
    return <MuiFileInput
        variant="outlined"
        size='small'
        margin='normal'
        fullWidth
        {...props}
    />;
}

const TextField = (props: TextFieldProps) => {
    return <MuiTextField
        variant="outlined"
        size='small'
        margin='normal'
        fullWidth
        {...props}
    />
}

export { FileInputField, TextField };

