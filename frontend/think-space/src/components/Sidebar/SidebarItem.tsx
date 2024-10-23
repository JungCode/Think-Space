export function SidebarItem({
  icon,
  text,
  active,
  alert,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
}) {
  return (
    <li
      className={`flex flex-1 gap-3 items-center cursor-pointer overflow-hidden transition duration-100 py-1 px-2 rounded-md mb-1
      ${
        active
          ? "bg-stone-200 text-stone-900"
          : "hover:bg-stone-200 text-stone-500"
      }
    `}
    >
      {icon}
      <span className="text-nowrap overflow-hidden">{text}</span>
      {alert && (
        <div className="absolute right-4 w-2 h-2 rounded bg-indigo-400" />
      )}
    </li>
  );
}
