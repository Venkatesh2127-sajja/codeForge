import { springBootFundamentalsLessons } from "./springBootFundamentals";

import { springCoreLessons } from "./springCore";

import { configurationLessons } from "./configuration";
import { restApiLessons } from "./restApi";
import { layeredArchitectureLessons } from "./layeredArchitecture";
import { validationLessons } from "./validation";
import { exceptionHandlingLessons } from "./exceptionHandling";

import { springDataJpaLessons } from "./springDataJpa";
import { jpaRelationshipsLessons } from "./jpaRelationships";
import { databaseTransactionsLessons } from "./databaseTransactions";
import { springSecurityLessons } from "./springSecurity";
import { jwtAuthenticationLessons } from "./jwtAuthentication";
import { springBootTestingLessons } from "./springBootTesting";
import { productionFeaturesLessons } from "./productionFeatures";
import { advancedLessons } from "./advanced";
import { interviewPreparationLessons } from "./interviewPreparation";

export const springBootLessons = {
  ...springBootFundamentalsLessons,
  ...springCoreLessons,
  ...configurationLessons,
  ...restApiLessons,
  ...layeredArchitectureLessons,
  ...validationLessons,
  ...exceptionHandlingLessons,
  ...springDataJpaLessons,
  ...jpaRelationshipsLessons,
  ...databaseTransactionsLessons,
  ...springSecurityLessons,
  ...jwtAuthenticationLessons,
  ...springBootTestingLessons,
  ...productionFeaturesLessons,
  ...advancedLessons,
  ...interviewPreparationLessons
};