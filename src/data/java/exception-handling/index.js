import { whatIsException } from "./whatIsException";
import { exceptionHierarchy } from "./exceptionHierarchy";
import { checkedVsUnchecked } from "./checkedVsUnchecked";
import { tryCatch } from "./tryCatch";
import { multipleCatchAndNestedTry } from "./multipleCatchAndNestedTry";
import { finallyLesson } from "./finally";
import { throwLesson } from "./throw";
import { throwsAndExceptionPropagation } from "./throwsAndExceptionPropagation";
import { customExceptions } from "./customExceptions";
import { advancedExceptionHandling } from "./advancedExceptionHandling";

export const exceptionHandlingLessons = {
  [whatIsException.id]: whatIsException,
  [exceptionHierarchy.id]: exceptionHierarchy,
  [checkedVsUnchecked.id]: checkedVsUnchecked,
  [tryCatch.id]: tryCatch,
  [multipleCatchAndNestedTry.id]: multipleCatchAndNestedTry,
  [finallyLesson.id]: finallyLesson,
  [throwLesson.id]: throwLesson,
  [throwsAndExceptionPropagation.id]: throwsAndExceptionPropagation,
  [customExceptions.id]: customExceptions,
  [advancedExceptionHandling.id]: advancedExceptionHandling

};