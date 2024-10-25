import SidebarItemUI from "../UI/SidebarItemUI";

export function SidebarItem({
  icon,
  text,
  alert,
  to,
}: {
  icon: React.ReactNode;
  text: string;
  alert?: boolean;
  to?: string;
}) {
  return (
    <SidebarItemUI to={to}>
      {icon}
      <span className="text-nowrap overflow-hidden">{text}</span>
      {alert && (
        <div className="absolute right-4 w-2 h-2 rounded bg-indigo-400" />
      )}
    </SidebarItemUI>
  );
}
