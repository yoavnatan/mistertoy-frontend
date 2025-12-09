import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({ value, handleChange }) {
    const [age, setAge] = React.useState('');

    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    return (
        <div>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select sx={{ backgroundColor: "white", height: 50 }} name="inStock"
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >

                    <MenuItem value={''}>All</MenuItem>
                    <MenuItem value={"true"}>In stock</MenuItem>
                    <MenuItem value={"false"}>Out of stock</MenuItem>
                </Select>
                <FormHelperText>Inventory</FormHelperText>
            </FormControl>
        </div>
    );
}