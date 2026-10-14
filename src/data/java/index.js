import { introductionLessons } from "./introduction";
import { basicsLessons } from "./basics";
import { oopsLessons } from "./oops";
import {exceptionHandlingLessons} from "./exception-handling";
import { collectionsLessons } from "./collections";
import { multithreadingLessons } from "./multithreading";
import { java8Lessons } from "./java8";

export const javaLessons = {
  ...introductionLessons,
  ...basicsLessons,
  ...oopsLessons,
  ...exceptionHandlingLessons,
  ...collectionsLessons,
  ...multithreadingLessons,
  ...java8Lessons


};