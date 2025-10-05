import Header from '../components/Header';
import EventsCalendar from '../components/EventsCalendar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Events Calendar',
};

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-poppins font-bold mb-6 text-center">Events Calendar</h1>
        <EventsCalendar />
      </section>
      <Footer />
    </main>
  );
}
