import { Route, Routes } from "react-router-dom"
import "./css/Admin.css";
import "./css/Sidebar.css";
import AuthLayout from "./Components/Auth-Layout/AuthLayout"
import Login from "./Pages/Login/Login"
import DefaultLayout from "./Components/Default-Layout/DefaultLayout"
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/Category/Category";
import Job from "./Pages/Job/Job";
import Contact from "./Pages/Contact/Contact";
import Subscribe from "./Pages/Subscribe/Subscribe";
import JobSeeker from "./Pages/Job-Seeker/JobSeeker";
import Blog from "./Pages/Blog/Blog";

function App() {

    return (
        <>

            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/" element={<Login />} />
                </Route>

                <Route element={<DefaultLayout />}>
                    {/* Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Category */}
                    <Route path="/category" element={<Category />} />
                    {/* Job */}
                    <Route path="/job" element={<Job />} />
                    {/* Blog */}
                    <Route path="/blog" element={<Blog />} />
                    {/* Job-Seeker */}
                    <Route path="/job-seeker/:id" element={<JobSeeker />} />
                    {/* Contact */}
                    <Route path="/contact" element={<Contact />} />
                    {/* Subscribe */}
                    <Route path="/subscribe" element={<Subscribe />} />
                </Route>
            </Routes>

        </>
    )
}

export default App
