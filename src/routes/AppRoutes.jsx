import { Routes, Route } from "react-router-dom";

// Auth Pages

import SuperAdminForgotPassword from "../auth/superAdmin/ForgotPassword";
import SuperAdminLogin from "../auth/superAdmin/Login";
import SuperAdminResetPassword from "../auth/superAdmin/ResetPassword";
import SuperAdminVerficationCode from "../auth/superAdmin/VerificationCode";

// Layout
import SuperAdminLayout from "../auth/superAdmin/pages/SuperAdminLayout";

// Dashboard + Pages
import SuperAdminDashboard from "../auth/superAdmin/pages/dashboard/SuperAdminDashboard";
import DataAnalytics from "../auth/superAdmin/pages/dataAnalytics/DataAnalytics";
import CompanyData from "../auth/superAdmin/pages/dataAnalytics/CompanyData";

import SuperAdminCourses from "../auth/superAdmin/pages/courses/SuperAdminCourses";
import SuperAdminCourseDetail from "../auth/superAdmin/pages/courses/CourseDetail";
import CreateCourse from "../auth/superAdmin/pages/courses/CreateCourse";

import SuperAdminAssessment from "../auth/superAdmin/pages/assesstments/SuperAdminAssessment";
import SuperAdminModuleDetail from "../auth/superAdmin/pages/courses/ModuleDetail";
import CreateAssessment from "../auth/superAdmin/pages/assesstments/CreateAssestment";
import ReviewPreview from "../auth/superAdmin/pages/assesstments/ReviewPreview";
import CreateCategory from "../auth/superAdmin/pages/assesstments/CreateCategory";
import EditExpression from "../auth/superAdmin/pages/assesstments/EditExpression";

import SuperAdminUserManagement from "../auth/superAdmin/pages/user-management/SuperAdminUserManagement";
import CompanyEmployees from "../auth/superAdmin/pages/user-management/CompanyEmployees";
import AddNewCompany from "../auth/superAdmin/pages/user-management/AddNewCompany";
import ManagePayment from "../auth/superAdmin/pages/user-management/ManagePayment";

import VirtualCourse from "../auth/superAdmin/pages/virtualcourse/VirtualCourse";
import SubscrptionAndBiling from "../auth/superAdmin/pages/subscriptionandbilling/SubscrptionAndBiling";
import SuperAdminReports from "../auth/superAdmin/pages/reports/SuperAdminReports";
import AllBlogs from "../auth/superAdmin/pages/blogs/AllBlogs";
import BlogDetail from "../auth/superAdmin/pages/blogs/BlogDetail";
import AddBlogForm from "../auth/superAdmin/pages/blogs/AddBlogForm";
import UserCourseView from "../auth/superAdmin/pages/user-management/UserCourseView";
import EditBlog from "../auth/superAdmin/pages/Blogs/EditBlogForm";



export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<SuperAdminLogin />} />
      <Route path="/forgot-password" element={<SuperAdminForgotPassword />} />
      <Route path="/verification" element={<SuperAdminVerficationCode />} />
      <Route path="/set-password" element={<SuperAdminResetPassword />} />

      {/* Super Admin Layout */}
      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />} />

        <Route path="data-analytics" element={<DataAnalytics />} />
        <Route path="data-analytics/company/:companyid" element={<CompanyData />} />
        <Route path="data-analytics/company/:companyid/course/:courseid" element={<UserCourseView />} />

        <Route path="courses" element={<SuperAdminCourses />} />
        <Route path="courses/detail" element={<SuperAdminCourseDetail />} />
        <Route path="courses/module" element={<SuperAdminModuleDetail />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/edit/:id" element={<CreateCourse />} />

        <Route path="assessments" element={<SuperAdminAssessment />} />
        <Route path="assessments/edit/:assestmentid" element={<CreateAssessment />} />
        <Route path="assessments/view/:assestmentid" element={<ReviewPreview />} />
        <Route path="assessments/create" element={<CreateAssessment />} />
        <Route path="assessments/create/add-category" element={<CreateCategory />} />
        <Route path="assessments/create/add-category/edit-expression/:expression_id" element={<EditExpression />} />
        <Route path="assessments/create/:assestmentid/review" element={<ReviewPreview />} />

        <Route path="user-management" element={<SuperAdminUserManagement />} />
        <Route path="user-management/employees/company/:companyid" element={<CompanyEmployees />} />
        <Route path="user-management/add-company" element={<AddNewCompany />} />
        <Route path="user-management/manage-payment/:companyid" element={<ManagePayment />} />

        <Route path="virtual-course" element={<VirtualCourse />} />
        <Route path="subscription-biling" element={<SubscrptionAndBiling />} />
        <Route path="reports" element={<SuperAdminReports />} />

        <Route path="all-blogs" element={<AllBlogs/>} />
        <Route path="blog/:id" element={<BlogDetail/>} />
        <Route path="all-blogs/add" element={<AddBlogForm/>} />
        <Route path="all-blogs/edit/:id" element={<EditBlog/>} />
      </Route>
    </Routes>
  );
}