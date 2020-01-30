import Timer from "./components/Timer";
import Dashboard from "./views/Dashboard";

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
];

export default dashBoardRoutes;