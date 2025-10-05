"use client";

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function EventsCalendar() {
  const [events, setEvents] = useState<any[]>([
    { id: '1', title: 'Mass', start: '2025-10-05T13:00:00' },
    { id: '2', title: 'Grief Support', start: '2025-10-07T18:00:00' },
    { id: '3', title: 'Christmas', start: '2025-12-25T13:00:00' },
  ]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
        events={events}
        selectable={true}
        select={(selection: any) => {
          const title = prompt('Event title')
          if (title) {
            setEvents((prev) => [...prev, { id: String(prev.length + 1), title, start: selection.startStr }])
          }
        }}
        eventClick={(info: any) => {
          alert(info.event.title + '\n' + info.event.start?.toString())
        }}
        height="auto"
      />
    </div>
  );
}
