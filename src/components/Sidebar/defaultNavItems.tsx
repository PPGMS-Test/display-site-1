import {
    ClipboardDocumentIcon,
    HomeIcon,
    ArrowUturnLeftIcon,
    WalletIcon,
    BeakerIcon,
    ShoppingBagIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";
import {
    CurrencyEuroIcon,
    CurrencyPoundIcon,
    ShoppingCartIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/20/solid";

export const defaultNavItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        label: "TodoList",
        href: "/todoList",
        icon: <ClipboardDocumentIcon className="w-6 h-6" />,
    },
    {
        label: "Products",
        href: "/product",
        icon: <ShoppingBagIcon className="w-6 h-6" />,
    },
    {
        label: "BCDC Standalone",
        href: "/shoppingCartBCDC",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        label: "APM Standalone",
        href: "/APM",
        icon: <WalletIcon className="w-6 h-6" />,
    },
    {
        label: "GooglePay",
        href: "/googlePay",
        icon: <CurrencyDollarIcon className="w-6 h-6" />,
    },
    {
        label: "ApplePay",
        href: "/applePay",
        icon: <CurrencyEuroIcon className="w-6 h-6" />,
    },

    {
        label: "Venmo",
        href: "/venmo",
        icon: <CurrencyPoundIcon className="w-6 h-6" />,
    },

    {
        label: "SinglePageTest",
        href: "/singlePageTest",
        icon: <BeakerIcon className="w-6 h-6" />,
    },
    {
        label: "Tooltips",
        href: "/tooltips",
        icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
    },
];
