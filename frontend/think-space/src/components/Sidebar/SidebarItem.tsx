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
      className={`flex flex-1 gap-3 items-center cursor-pointer
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100"
          : "hover:bg-indigo-50 text-gray-600"
      }
    `}
    >
      {icon}
      <span>{text}</span>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />
      )}
    </li>
  );
}
