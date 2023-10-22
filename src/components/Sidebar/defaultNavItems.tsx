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
        href: "/lab",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        label: "TodoList",
        href: "/lab/todoList",
        icon: <ClipboardDocumentIcon className="w-6 h-6" />,
    },
    {
        label: "Products",
        href: "/lab/product",
        icon: <ShoppingBagIcon className="w-6 h-6" />,
    },
    {
        label: "BCDC Standalone",
        href: "/lab/shoppingCartBCDC",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        label: "APM Standalone",
        href: "/lab/APM",
        icon: <WalletIcon className="w-6 h-6" />,
    },
    {
        label: "GooglePay",
        href: "/lab/googlePay",
        icon: <CurrencyDollarIcon className="w-6 h-6" />,
    },
    {
        label: "ApplePay",
        href: "/lab/applePay",
        icon: <CurrencyEuroIcon className="w-6 h-6" />,
    },

    {
        label: "Venmo",
        href: "/lab/venmo",
        icon: <CurrencyPoundIcon className="w-6 h-6" />,
    },

    {
        label: "SinglePageTest",
        href: "/lab/singlePageTest",
        icon: <BeakerIcon className="w-6 h-6" />,
    },
    {
        label: "Tooltips",
        href: "/lab/tooltips",
        icon: <QuestionMarkCircleIcon className="w-6 h-6" />,
    },
];
