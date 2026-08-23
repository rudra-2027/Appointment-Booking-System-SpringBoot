import TimelineEvent from "./TimelineEvent";

export default function Timeline({ events }) {
  return (
    <div className="space-y-4 border-l border-line pl-5">
      {events.map((event) => (
        <TimelineEvent key={`${event.title}-${event.time}`} {...event} />
      ))}
    </div>
  );
}
