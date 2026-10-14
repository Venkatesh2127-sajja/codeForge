function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange
}) {
  return (
    <div className="category-filter">

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={
            selectedCategory === category
              ? "category-button active"
              : "category-button"
          }
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;