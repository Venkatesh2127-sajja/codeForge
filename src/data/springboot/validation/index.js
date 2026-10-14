import { whatIsValidation } from "./whatIsValidation";
import { beanValidation } from "./beanValidation";
import { validationDependencies } from "./validationDependencies";
import { notNullNotEmptyNotBlank } from "./notNullNotEmptyNotBlank";
import { sizeMinMaxPositive } from "./sizeMinMaxPositive";
import { emailPatternPastFuture } from "./emailPatternPastFuture";
import { validAndValidated } from "./validAndValidated";
import { validatingRequestDtos } from "./validatingRequestDtos";
import { handlingValidationErrors } from "./handlingValidationErrors";
import { validationBestPractices } from "./validationBestPractices";

export const validationLessons = {
  [whatIsValidation.id]: whatIsValidation,

  [beanValidation.id]: beanValidation,

  [validationDependencies.id]: validationDependencies,

  [notNullNotEmptyNotBlank.id]:
    notNullNotEmptyNotBlank,

  [sizeMinMaxPositive.id]:
    sizeMinMaxPositive,

  [emailPatternPastFuture.id]:
    emailPatternPastFuture,

  [validAndValidated.id]:
    validAndValidated,

  [validatingRequestDtos.id]:
    validatingRequestDtos,

  [handlingValidationErrors.id]:
    handlingValidationErrors,

  [validationBestPractices.id]:
    validationBestPractices
};