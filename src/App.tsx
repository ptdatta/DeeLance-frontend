import { Routes, Route, Outlet } from "react-router-dom";
import FullDashboard from "components/FullDashboard";
import AppNavigator from "components/AppNavigator";
import ProfileTasks from "sections/MyProfilePage/ProfileTasks";
import ProfileSavedTasks from "sections/MyProfilePage/ProfileSavedTasks";
import PageLayout from "layouts/PageLayout";
import EmailVerify from "./pages/EmailVerify";
import EmployerHome from "./pages/Employer/EmployerHome";
import EmployerJobDashboard from "./pages/Employer/EmployerJobDashboard";
import EmployerProfile from "./pages/Employer/EmployerProfile";
import MyPostJobs from "./pages/Employer/MyPostJobs";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import InboxPage from "./pages/InboxPage";
import JobDetailPage from "./pages/JobDetailPage";
import JobFilterPage from "./pages/JobFilterPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import MyProfilePage from "./pages/MyProfilePage";
import MyProposalsPage from "./pages/MyProposalsPage";
import MyWalletPage from "./pages/MyWalletPage";
import NotificationPage from "./pages/NotificationPage";
import OrderPage from "./pages/OrderPage";
import Order from "./pages/Order";
import SavedJobPage from "./pages/SavedJobPage";
import SignUp from "./pages/SignUp";
import TaskPreview from "./pages/TaskPreview";
import TasksPage from "./pages/TasksPage";
import TicketPage from "./pages/TicketPage";
import TicketRequestPage from "./pages/TicketRequestPage";
import Overview from "./sections/MyProfilePage/Overview";
import Portfolio from "./sections/MyProfilePage/Portfolio";
import Projects from "./sections/MyProfilePage/Projects";
import Reviews from "./sections/MyProfilePage/Reviews";
import Cv from "./sections/MyProfilePage/Cv";
import Settings from "./sections/MyProfilePage/Settings";
import NotFound from "./pages/NotFound";
import JobPostForm from "./pages/Employer/JobPostForm";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import TermsPage from "./sections/terms/TermsPage";
import PrivacyPage from "./sections/terms/PrivacyPage";
import AuthenticationPageWrapper from "./layouts/AuthenticationPageWrapper";
import EmployerProfiles from "./components/EmployerCard/EmployerProfiles";
import MyProfilePages from "./pages/Jobseeker/MyProfilePage";
import HomePages from "./pages/Jobseeker/HomePages";
import LoginPage from "./pages/LoginPage";
import CreateNewPassword from "./pages/CreateNewPassword";
import CreateTaskPage from "./pages/CreateTaskPage";
import CustomerSupportPage from "./pages/CustomerSupportPage";
import AdminDashboardPage from "./pages/AdminPanel/AdminDashboardPage";
import AdminMembersPage from "./pages/AdminPanel/AdminMembersPage";
import AdminPage from "./pages/AdminPanel/AdminPage";
import AdminSingleMemberPage from "./pages/AdminPanel/AdminSingleMemberPage";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import OrderPayment from "./pages/OrderProcess/OrderPayment";

// 1. Get projectId
const projectId = "4ff178b5adf37e8779469102693e824b";

// 2. Set chains
const mainnet = {
  chainId: 45510,
  name: "Deelance",
  currency: "DEE",
  explorerUrl: "https://deescan.com/",
  rpcUrl: "https://rpc.deelance.com",
};
// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,

  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true,
  themeVariables: {
    "--w3m-accent": "#06a551", // Primary color
    "--w3m-border-radius-master": "0.0575rem", // Matches rounded-md
    "--w3m-font-size-master": "0.7rem", // Matches your button's default size
    "--w3m-color-mix": "#06a551", // Blend color
    "--w3m-color-mix-strength": 0, // Blend strength, adjust as needed
  },
});

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<AppNavigator />} />

        <Route element={<AuthenticationPageWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/email-verify" element={<EmailVerify />} />
        </Route>

        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/create-password" element={<CreateNewPassword />} />
        <Route path="/my-proposals" element={<MyProposalsPage />} />

        <Route element={<FullDashboard />}>
          <Route
            element={
              <PageLayout>
                <Outlet />
              </PageLayout>
            }
          >
            <Route path="/task-preview/:id" element={<TaskPreview />} />

            <Route
              path="/dashboard"
              element={
                <>
                  {/* <UserRoleRedirector /> */}
                  <HomePage />
                </>
              }
            />
          </Route>

          <Route
            element={
              <PageLayout showFooter={false}>
                <Outlet />
              </PageLayout>
            }
          >
            <Route path="/profile/:userId" element={<MyProfilePage />}>
              <Route index element={<Overview />} />
              <Route path="tasks" element={<ProfileTasks />} />
              <Route path="saved-tasks" element={<ProfileSavedTasks />} />
            </Route>

            <Route
              element={
                <ProtectedRoutes>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="/Jobdashboard" element={<HomePages />} />
              <Route path="/job-filter-page" element={<JobFilterPage />} />
              <Route path="/search" element={<JobFilterPage />} />
              <Route path="/job-detail/:id" element={<JobDetailPage />} />
              {/* employer */}
              <Route path="/employer-home" element={<EmployerHome />} />
              <Route
                path="/employer-filter-page"
                element={<EmployerJobDashboard />}
              />
              <Route path="/employer-profile" element={<EmployerProfile />} />
              <Route path="/post-jobs" element={<JobPostForm />} />
              {/* <Route path="/post-jobs-next" element={<PostJobsNext />} /> */}
              <Route path="/my-post-job" element={<MyPostJobs />} />

              <Route path="/employerprofiles/" element={<EmployerProfiles />}>
                <Route index element={<Overview />} />
                <Route path="project" element={<Projects />} />

                {/*  */}
                <Route path="portfolio" element={<Portfolio />} />

                {/*  */}
                <Route path="settings" element={<Settings />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="cv" element={<Cv />} />
              </Route>

              {/* end */}

              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/create-task" element={<CreateTaskPage />} />

              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/order/:orderId" element={<Order />} />
              <Route path="/order-payment/:taskId" element={<OrderPayment />} />
              {/* <Route path="/order" element={<OrderPage />} /> */}

              <Route path="/saved-job" element={<SavedJobPage />} />

              <Route path="/my-wallet" element={<MyWalletPage />} />

              {/* <Route
                path="/set-profile"
                element={
                  <ProfileDataProvider>
                    <SetProfilePage />
                  </ProfileDataProvider>
                }
              /> */}

              <Route
                path="/customer-support"
                element={<CustomerSupportPage />}
              />
              <Route path="/ticket" element={<TicketPage />} />
              <Route path="/ticket-request" element={<TicketRequestPage />} />

              <Route path="/notification" element={<NotificationPage />} />

              <Route path="/jobprofile" element={<MyProfilePages />}>
                <Route index element={<Overview />} />
                <Route path="project" element={<Projects />} />

                {/*  */}
                <Route path="portfolio" element={<Portfolio />} />

                {/*  */}
                <Route path="settings" element={<Settings />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="cv" element={<Cv />} />
              </Route>
            </Route>
          </Route>

          <Route
            element={
              <ProtectedRoutes>
                <Outlet />
              </ProtectedRoutes>
            }
          >
            <Route
              path="/inbox"
              element={
                <PageLayout
                  showFooter={false}
                  childrenWrapperClassName="!p-0"
                  navbarClassName="shadow-none border-b border-black/10"
                >
                  <InboxPage />
                </PageLayout>
              }
            />
          </Route>

          <Route
            element={
              <ProtectedRoutes adminCheck redirectTo="/">
                <Outlet />
              </ProtectedRoutes>
            }
          >
            <Route path="admin-panel" element={<AdminPage />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="members" element={<AdminMembersPage />} />
              <Route
                path="member/:userId"
                element={<AdminSingleMemberPage />}
              />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy&policy" element={<PrivacyPage />} />
        <Route path="/order/:orderId" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
