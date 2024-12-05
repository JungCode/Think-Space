const events = [
  {
    name: "Event 1",
    date: "2023-11-01",
    description: "Description for event 1.",
  },
  {
    name: "Event 2",
    date: "2023-11-15",
    description: "Description for event 2.",
  },
  {
    name: "Event 3",
    date: "2023-12-01",
    description: "Description for event 3.",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h2 className="mb-4 text-2xl font-bold">Upcoming Events</h2>
      <ul>
        {events.map((event, index) => (
          <li
            key={index}
            className="p-4 mb-4 border border-gray-300 rounded-lg"
          >
            <h3 className="text-xl font-semibold">{event.name}</h3>
            <p className="text-gray-600">{event.date}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingEvents;
