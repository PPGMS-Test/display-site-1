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

const productEnvItemList: NavItem[] = [
    {
        label: "Dashboard",
        href: "/lab",
        icon: <HomeIcon className="w-6 h-6" />,
    },
    {
        label: "JS SDK Params",
        href: "/lab/todoList",
        icon: <ClipboardDocumentIcon className="w-6 h-6" />,
    },
    {
        label: "Products",
        href: "/lab/product",
        icon: <ShoppingBagIcon className="w-6 h-6" />,
    },
    {
        label: "SPB Payments",
        href: "/lab/shoppingCartBCDC",
        icon: <ShoppingCartIcon className="w-6 h-6" />,
    },
    {
        label: "APM",
        href: "/lab/APM",
        icon: <WalletIcon className="w-6 h-6" />,
    },
];

const localDevelopmentEnvItemList: NavItem[] = [
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

//prod env
let defaultNavItems: NavItem[] = [...productEnvItemList];

//add local test env
if( process.env.REACT_APP_SHOW_SIDEBAR_TEST && process.env.REACT_APP_SHOW_SIDEBAR_TEST === "TRUE"){
    defaultNavItems = [...defaultNavItems,...localDevelopmentEnvItemList]
}

export default defaultNavItems;
