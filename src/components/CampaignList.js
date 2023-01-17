import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { Check, Close, WarningOutlined } from '@mui/icons-material';
import './CampaignList.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCampaign } from '../app_redux/actions/campaignList';
import { filterCampaign } from '../app_redux/actions/campaignFilter';

import moment from 'moment';
import { CircularProgress } from '@mui/material';
// let isFilterApplied = false;
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'campaign_name',
    headerName: 'Campaign Name',
    editable: false,
    flex: 1,
    headerClassName: 'grid-header',
  },
  {
    field: 'username',
    headerName: 'User name',
    sortable: false,
    flex: 1,
    headerClassName: 'grid-header',
    valueGetter: (params) =>
      `${params.row.username ? params.row.name : 'Unknown User'}`,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    type: 'date',
    editable: false,
    flex: 1,
    headerClassName: 'grid-header',
    valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    type: 'date',
    editable: false,
    flex: 1,
    headerClassName: 'grid-header',
    valueFormatter: params => moment(params?.value).format("DD/MM/YYYY"),
  },
  {
    field: 'status',
    headerName: 'Status',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    headerClassName: 'grid-header',
    renderCell: (params) => (
        (Date.now() >= Date.parse(params.row.startDate) && Date.now() <= Date.parse(params.row.endDate)) ?
        <strong>
            <Chip icon={<Check />} color="success" label="Active" variant="outlined" />
        </strong>
        :
        <strong>
            { Date.now() < Date.parse(params.row.startDate) ? <Chip icon={<WarningOutlined />} color="info" label="Not Started" variant="outlined" /> : <Chip icon={<Close />} color="error" label="Inactive" variant="outlined" /> }            
        </strong>
    ),
  },
  {
    field: 'budget',
    headerName: 'Budget',
    editable: false,
    flex: 1,
    headerClassName: 'grid-header',
    valueGetter: (params) =>
      `${  Intl.NumberFormat('en', {notation: "compact"}).format(params.row.budget) + ' USD'}`,
  },
];



export default function CampaignList(props) {
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const [campaigns, setCampaigns] = useState([]);

    const campaignList = useSelector( (state) => state.campaignList.campaignList )
    const filteredCampaignsList = useSelector((state) => state.campaignList.filteredCampaignsList);
    const loading = useSelector ((state) => state.campaignList.loading)
    const dispatch = useDispatch();

    const { dateFilter, nameFilter } = props;
    

    useEffect(() => {
        dispatch(getAllCampaign());
    }, [dispatch]);


    const setCampaignData = (data) => {
      if(data && data.length > 0) {
        let campaignData = data.map((value) => ({
          ...value,
          key: value.id
        }));
        setCampaigns(campaignData)
      } else {
        setCampaigns([])
      } 
    };

    useEffect(() => {

      if((dateFilter.startDate !== null && dateFilter.endDate !== null) || nameFilter !== null) {
        setIsFilterApplied(true);
      }

      if(isFilterApplied) {
        setCampaignData(filteredCampaignsList);
      } else {
        setCampaignData(campaignList);
      }

    }, [loading, campaignList, filteredCampaignsList, isFilterApplied, dateFilter, nameFilter])

    useEffect(() => {
      setCampaigns(previousCampaigns => [...previousCampaigns, ...props.campaignData])
    }, [props.campaignData]);

    
    useEffect(() => {
        setIsFilterApplied(true);
        if(JSON.stringify(props.dateFilter) === '{}' || (dateFilter.startDate === null && dateFilter.endDate === null)) {
          setIsFilterApplied(false);
        }
        dispatch(filterCampaign({ name: nameFilter, dateRange: dateFilter  }));

    }, [nameFilter, dateFilter, dateFilter.startDate, dateFilter.endDate, dispatch]);


    useEffect(() => {
      setIsFilterApplied(true);

      if(!nameFilter) {
        setIsFilterApplied(false);
      }
      dispatch(filterCampaign({ name: nameFilter, dateRange: dateFilter  }));

    }, [nameFilter, dispatch, dateFilter]);


    return (
        <Box sx={{ height: 600, 
                  width: '100%', 
                  '.MuiDataGrid-columnSeparator': { display: 'none',}, 
                  '&.MuiDataGrid-root': { border: 'none', },
                  'columnHeaderTitle': {fontWeight: '600'},
                  'columnSeparator': { borderWidth: 0 }
                }}>
            { loading && <CircularProgress /> }
            { !loading && campaigns &&  campaigns.length === 0 && <p>No campaigns found.</p>}
            { !loading && campaigns && campaigns.length > 0 && <DataGrid
                initialState={{
                    columns: {
                    columnVisibilityModel: {
                        // Hide columns status and traderName, the other columns will remain visible
                        id: false,
                    },
                    },
                }}
                rows={campaigns}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />}
        </Box>
    );
}
