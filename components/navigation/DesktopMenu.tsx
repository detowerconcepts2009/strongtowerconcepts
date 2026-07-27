import NavItem from "./NavItem";
import NavDropdown from "./NavDropdown";
import { navigation } from "@/lib/navigation";

export default function DesktopMenu() {
  return (
    <div className="hidden lg:flex items-center gap-2">
      {navigation.map((item) =>

        item.children ? (

          <NavDropdown
            key={item.label}
            title={item.label}
            items={item.children}
          />

        ) : (

          <NavItem
            key={item.label}
            href={item.href!}
            label={item.label}
          />

        )

      )}
    </div>
  );
}