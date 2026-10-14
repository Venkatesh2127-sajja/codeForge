import { useMemo, useState } from "react";

import PageContainer from "../../components/common/PageContainer";
import SectionHeader from "../../components/common/SectionHeader";

import CourseCard from "../../components/tutorial/CourseCard";
import CategoryFilter from "../../components/tutorial/CategoryFilter";

import { courses } from "../../data/courses";

function Tutorials() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        courses.map((course) => course.category)
      )
    ];

    return ["All", ...uniqueCategories];
  }, []);

  const filteredCourses = useMemo(() => {
    const searchText = searchQuery
      .toLowerCase()
      .trim();

    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" ||
        course.category === selectedCategory;

      const matchesSearch =
        !searchText ||
        course.title
          .toLowerCase()
          .includes(searchText) ||
        course.description
          .toLowerCase()
          .includes(searchText) ||
        course.category
          .toLowerCase()
          .includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <PageContainer>

      <div className="tutorials-page">

        {/* Header */}

        <section className="tutorials-header">

          <span className="page-eyebrow">
            CODEFORGE LEARNING
          </span>

          <h1>
            Tutorials
          </h1>

          <p>
            Learn programming and software development
            step by step through practical tutorials,
            examples and projects.
          </p>

        </section>


        {/* Search */}

        <section className="tutorial-search-section">

          <div className="tutorial-search">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />

          </div>

        </section>


        {/* Categories */}

        <section className="tutorial-category-section">

          <SectionHeader
            title="Browse by Category"
            description="Choose a learning area to find relevant technologies."
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

        </section>


        {/* Courses */}

        <section className="tutorial-courses-section">

          <SectionHeader
            title={
              selectedCategory === "All"
                ? "All Tutorials"
                : `${selectedCategory} Tutorials`
            }
            description={`${filteredCourses.length} tutorials available`}
          />

          {filteredCourses.length > 0 ? (

            <div className="course-grid">

              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}

            </div>

          ) : (

            <div className="tutorial-empty-state">

              <h3>
                No tutorials found
              </h3>

              <p>
                Try a different search term or category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          )}

        </section>

      </div>

    </PageContainer>
  );
}

export default Tutorials;