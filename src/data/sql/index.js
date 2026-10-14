import { aggregateFunctionsLessons } from "./aggregateFunctions";
import { groupByHavingLessons } from "./groupByHaving";
import { sqlIntroductionLessons } from "./introduction";
import { sqlJoinsLessons } from "./joins";
import { selectAndFilteringLessons } from "./selectAndFiltering";
import { sortingAndPaginationLessons } from "./sortingAndPagination";

export const sqlLessons = {
  ...sqlIntroductionLessons,
  ...selectAndFilteringLessons,
  ...sortingAndPaginationLessons,
  ...aggregateFunctionsLessons,
  ...groupByHavingLessons,
  ...sqlJoinsLessons
};