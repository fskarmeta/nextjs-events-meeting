import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-utils';

const HomePage = ({ featuredEvents }) => {
  if (!featuredEvents) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta
          name='description'
          content='Find a lot of content about programming events'
        />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 21600,
  };
}

export default HomePage;
