import { ClipboardDocumentIcon, HomeIcon,ArrowUturnLeftIcon, WalletIcon } from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/tooltips",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "TodoList",
    href: "/tooltips",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "ShoppingCart BCDC",
    href: "/shoppingCartBCDC",
    icon: <ShoppingCartIcon className="w-6 h-6" />,
  },
  {
    label: "GooglePay",
    href: "/googlePay",
    icon: <WalletIcon className="w-6 h-6" />,
  },
  {
    label: "ApplePay",
    href: "/applePay",
    icon: <ClipboardDocumentIcon className="w-6 h-6" />,
  },
  {
    label: "Venmo",
    href: "/venmo",
    icon: <ArrowUturnLeftIcon className="w-6 h-6" />,
  },
];
