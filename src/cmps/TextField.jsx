import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ placeHolder, type, name, value, handleChange }) {
    return (
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" /> */}
            <TextField type={type} id="standard-basic" label={placeHolder} variant="standard" name={name} value={value} onChange={handleChange} />
        </Box>
    );
}