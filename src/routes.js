import Timer from "./components/Timer";
import Dashboard from "./views/Dashboard";
import AdminPage from "./views/AdminPage";

const dashBoardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
    },
    {
        path: "/timer",
        name: "Timer",
        component: Timer
    },
    {
        path: "/admin",
        name: "AdminPage",
        component: AdminPage
    },
];

export default dashBoardRoutes;