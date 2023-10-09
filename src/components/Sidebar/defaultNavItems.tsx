import { ClipboardDocumentIcon, HomeIcon,ArrowUturnLeftIcon, WalletIcon, BeakerIcon } from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

export const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "TodoList",
    href: "/todoList",
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
    label: "APM",
    href: "/APM",
    icon: <WalletIcon className="w-6 h-6" />,
  },
  {
    label: "ApplePay",
    href: "/applePay",
    icon: <ClipboardDocumentIcon className="w-6 h-6" />,
  },

  {
    label: "Tooltips",
    href: "/tooltips",
    icon: <ClipboardDocumentIcon className="w-6 h-6" />,
  },
  {
    label: "Venmo",
    href: "/venmo",
    icon: <ArrowUturnLeftIcon className="w-6 h-6" />,
  },

  {
    label: "SinglePageTest",
    href: "/singlePageTest",
    icon: <BeakerIcon className="w-6 h-6" />,
  },
];
