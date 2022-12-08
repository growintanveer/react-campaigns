import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import { Check, Close, WarningOutlined } from '@mui/icons-material';
import './CampaignList.css';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCampaign } from '../app_redux/actions/campaignList';

import moment from 'moment';

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

    const [campaigns, setCampaigns] = React.useState([]);
    let filteredCampaigns = [];

    const campaignList = useSelector( (state) => state.campaignList.campaignList )
    const loading = useSelector ((state) => state.campaignList.loading)
    const dispatch = useDispatch();
    

    React.useEffect(() => {
        dispatch(getAllCampaign());
    }, []);
    
    React.useEffect(() => {
      if(campaignList.length > 0) {
        let campaignData = campaignList.map((value) => ({
          ...value,
          key: value.id
        }));
        setCampaigns(campaignData)
      } else {
        setCampaigns([])
      }

    }, [loading])

    React.useEffect(() => {
      setCampaigns((prevState) => {
        return [...prevState, ...props.campaignData]
      })

    }, [props.campaignData])                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

    if(!(JSON.stringify(props.dateFilter) === '{}') && (props.dateFilter.startDate && props.dateFilter.endDate)) {

        if(!props.nameFilter) {
          filteredCampaigns = campaigns.filter((campaign) => {
            return Date.parse(campaign.startDate) >= Date.parse(props.dateFilter.startDate) && 
                    Date.parse(campaign.endDate) <= Date.parse(props.dateFilter.endDate)
          });
        }

        if(props.nameFilter) {
          filteredCampaigns = campaigns.filter((campaign) => {
            return Date.parse(campaign.startDate) >= Date.parse(props.dateFilter.startDate) && 
                      Date.parse(campaign.endDate) <= Date.parse(props.dateFilter.endDate) &&
                      campaign.name.toLowerCase().includes(props.nameFilter.toLowerCase())
          });
        }

        if(props.dateFilter.startDate === null && props.dateFilter.endDate === null) {
          filteredCampaigns = [...campaigns];      
        }

    } else if(props.nameFilter) {

      filteredCampaigns = campaigns.filter((campaign) => {
        return campaign.name.toLowerCase().includes(props.nameFilter.toLowerCase())
      });

    } else {
      filteredCampaigns = [...campaigns];
    }
    

    return (
        <Box sx={{ height: 600, 
                  width: '100%', 
                  '.MuiDataGrid-columnSeparator': { display: 'none',}, 
                  '&.MuiDataGrid-root': { border: 'none', },
                  'columnHeaderTitle': {fontWeight: '600'},
                  'columnSeparator': { borderWidth: 0 }
                }}>
            { filteredCampaigns && <DataGrid
                initialState={{
                    columns: {
                    columnVisibilityModel: {
                        // Hide columns status and traderName, the other columns will remain visible
                        id: false,
                    },
                    },
                }}
                rows={filteredCampaigns}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />}
        </Box>
    );
}
