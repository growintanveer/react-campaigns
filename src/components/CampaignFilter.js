import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Search } from '@mui/icons-material';
import DateRangePicker from './plugins/DateRangeFilter';
// import Visibility from '@mui/icons-material/Visibility';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    boxShadow: 'none'
  }));

export default function CampaignFilter(props) {

    const handleDateRange = data => {
        props.onDateChange(data);
    };

    const handleNameChange = event => {
        props.onNameChange(event.target.value)
    }

  return (
    <Grid container spacing={2}>
        <Grid xs={6}>
            <Item>
                <DateRangePicker onDateChange={handleDateRange} />
            </Item>
        </Grid>
        <Grid xs={6}>
            <Item>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-search">Search by name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-search"
                        type="text"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Search by name"
                        position="end"
                        onChange={handleNameChange}
                    />
                </FormControl>
            </Item>
        </Grid>
    </Grid>
  );
}