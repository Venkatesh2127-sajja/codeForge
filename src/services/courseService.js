import { courses } from "../data/courses";

export const getCourses = async () => {
  return courses;
};

export const getCourseBySlug = async (slug) => {
  return courses.find(
    (course) => course.slug === slug
  );
};