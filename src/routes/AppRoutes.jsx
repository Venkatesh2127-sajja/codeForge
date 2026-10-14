import { BrowserRouter, Routes, Route} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ScrollToTop from "../components/common/ScrollToTop";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// Tutorials
import Tutorials from "../pages/tutorials/Tutorials";
import CourseDetails from "../pages/tutorials/CourseDetails";

import LessonDetails from "../pages/tutorials/LessonDetails";


function AppRoutes () {
    return(
        <BrowserRouter>
        <ScrollToTop />
        <Routes>
            <Route element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            //Tutorial
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path = "/tutorials/:courseSlug" element={<CourseDetails />} />

            <Route
  path="/tutorials/:courseSlug/:topicSlug/:lessonSlug"
  element={<LessonDetails />}
/>
            </Route>
        </Routes>
        </BrowserRouter>
    )

}


export default AppRoutes;