import React from 'react';
import { render, screen, waitForElement, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import CampaignFilter from './components/CampaignFilter';
import CampaignList from './components/CampaignList';
import DateRangePicker from './components/plugins/DateRangeFilter'
import moment from 'moment';

import mockFetch from './mocks/mockFetch';

import { Provider } from 'react-redux';
import { store } from './app_redux/store';


beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});

test("renders the App component", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent(/Campaign List/);
});



describe("Tests for CampaignFilter component", () => {

  it("snapshot CampaignFilter component", () => {
    const mockOnDateChange = {};
    const mockOnNameChange = "";
    const { asFragment } = render(<CampaignFilter onDateChange={mockOnDateChange} onNameChange={mockOnNameChange} />);
    expect(asFragment(<CampaignFilter onDateChange={mockOnDateChange} onNameChange={mockOnNameChange} />)).toMatchSnapshot();
  });

});

describe("Tests for CampaignList component", () => {

  it("snapshot CampaignList component", () => {
    const mockDateFilter = {};
    const mockNameFilter = "";
    const mockCampaigns = [];
    const { asFragment } = render(
      <Provider store={store}>
        <CampaignList dateFilter={mockDateFilter} nameFilter={mockNameFilter} campaignData={mockCampaigns} />
      </Provider>
    );
    expect(asFragment(<CampaignList dateFilter={mockDateFilter} nameFilter={mockNameFilter} campaignData={mockCampaigns} />)).toMatchSnapshot();
  });

});



describe("Tests for DateRangePicker component", () => {

  it("snapshot DateRangePicker component", () => {
    const mockOnDateChange = {};
    const { asFragment } = render(<DateRangePicker onDateChange={mockOnDateChange} />);
    expect(asFragment(<DateRangePicker onDateChange={mockOnDateChange} />)).toMatchSnapshot();
  });

});


test("should show search input with Search by name label", () => {
  render(<CampaignFilter />);
  expect(screen.findAllByLabelText('Search by name'));
});

test("should show date input with Start date and End date label", () => {
  render(<DateRangePicker />);
  expect(screen.findAllByLabelText('Start Date'));
  expect(screen.findAllByLabelText('End Date'));
});


test("should show data grid", () => {
  const mockDateFilter = {};
  const mockNameFilter = "";
  const mockCampaigns = [];
  const {container} = render(
    <Provider store={store}>
    <CampaignList dateFilter={mockDateFilter} nameFilter={mockNameFilter} campaignData={mockCampaigns} />
  </Provider>);
  expect(container.getElementsByClassName('MuiDataGrid-root').length).toBe(1);
});


// 
describe("Tests for CampaignList data", () => {

  beforeAll(() => {
    jest.spyOn(window, "fetch").mockImplementation(mockFetch);
  })
  
  afterAll(() => {
    jest.restoreAllMocks()
  });

  it("should have search by entered start and end date", async () => {
    // await act(async () => render(<App />));
    render(<App />);
    expect((await screen.findByRole('grid')).getAttribute('aria-rowcount')).toBe("4");
  });

});





// should be able to search and display campaign list by start and end date