import './App.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import CampaignList from './components/CampaignList';
import CampaignFilter from './components/CampaignFilter';
import React from 'react';

import { Provider } from 'react-redux';
import { store } from './app_redux/store';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {

  const [dateFilter, setDateFilter] = React.useState({})
  const [nameFilter, setNameFilter] = React.useState("")
  const [campaigns, setCampaigns] = React.useState([])

  window.AddCampaigns = function(data) {
    
    let campaignData = data.map((value) => ({
      ...value,
      key: value.id
    }));
    console.log(campaignData);
    setCampaigns(campaignData);
  };

  const handleDateFilter = dateObj => {
    // console.log("APP.JS ----> dateObj")
    // console.log(dateObj)
    setDateFilter((prevState) => {
      return {...prevState, ...dateObj}
    })
  }


  const handleNameFilter = name => {
    // console.log("APP.JS ----> name")
    // console.log(name)
    setNameFilter(name)
  }

  return (
    <Provider store={store}>
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Item>
                <h1>Campaign List</h1>
              </Item>
            </Grid>
            <Grid xs={12}>
              <Item><CampaignFilter onDateChange={handleDateFilter} onNameChange={handleNameFilter} /></Item>
            </Grid>
            <Grid xs={12}>
              <Item>
                <CampaignList  dateFilter={dateFilter} nameFilter={nameFilter} campaignData={campaigns} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Provider>
  );
}

export default App;
