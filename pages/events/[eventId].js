import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import { Fragment } from 'react';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Head from 'next/head';
import Comments from '../../components/input/comments';
// import ErrorAlert from '../../components/ui/error-alert';

const EventDetailPage = ({ event }) => {
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>;
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.eventId;

  const event = await getEventById(id);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 1200,
  };
}

export async function getStaticPaths() {
  const data = await getFeaturedEvents();

  const events = data.map(e => ({
    params: { eventId: e.id },
  }));

  return {
    paths: events,
    fallback: true,
  };
}
export default EventDetailPage;
