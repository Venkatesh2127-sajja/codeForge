import { whatIsExceptionHandling } from "./whatIsExceptionHandling";
import { checkedVsUncheckedExceptions } from "./checkedVsUncheckedExceptions";
import { runtimeException } from "./runtimeException";
import { exceptionHandler } from "./exceptionHandler";
import { controllerAdvice } from "./controllerAdvice";
import { customExceptions } from "./customExceptions";
import { globalExceptionHandling } from "./globalExceptionHandling";
import { errorResponseDesign } from "./errorResponseDesign";
import { commonSpringBootExceptions } from "./commonSpringBootExceptions";
import { exceptionHandlingBestPractices } from "./exceptionHandlingBestPractices";

export const exceptionHandlingLessons = {
  [whatIsExceptionHandling.id]:
    whatIsExceptionHandling,

  [checkedVsUncheckedExceptions.id]:
    checkedVsUncheckedExceptions,

  [runtimeException.id]:
    runtimeException,

  [exceptionHandler.id]:
    exceptionHandler,

  [controllerAdvice.id]:
    controllerAdvice,

  [customExceptions.id]:
    customExceptions,

  [globalExceptionHandling.id]:
    globalExceptionHandling,

  [errorResponseDesign.id]:
    errorResponseDesign,

  [commonSpringBootExceptions.id]:
    commonSpringBootExceptions,

  [exceptionHandlingBestPractices.id]:
    exceptionHandlingBestPractices
};