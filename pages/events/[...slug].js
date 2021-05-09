import { Fragment } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-utils';

const FilteredEventsPage = ({ filteredEvents, date, hasError }) => {
  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filters</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events founds for the chosen filter!</p>
        </ErrorAlert>

        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const newDate = new Date(date.year, date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={newDate} />
      <EventList items={filteredEvents}></EventList>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const year = +filterData[0];
  const month = +filterData[1];

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({ year, month });

  return {
    props: {
      filteredEvents,
      date: {
        year,
        month,
      },
    },
  };
}

export default FilteredEventsPage;
