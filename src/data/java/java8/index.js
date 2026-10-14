import { java8Fundamentals } from "./java8Fundamentals";
import { functionalProgrammingFundamentals } from "./functionalProgrammingFundamentals";
import { lambdaExpressions } from "./lambdaExpressions";
import { methodReferences } from "./methodReferences";
import { streamApiFundamentals } from "./streamApiFundamentals";
import { streamApiAdvanced } from "./streamApiAdvanced";
import { optional } from "./optional";
import { dateTimeApi } from "./dateTimeApi";
import { interfaceEnhancements } from "./interfaceEnhancements";
import { java8AdvancedConcepts } from "./java8AdvancedConcepts";
import { advancedCollectors } from "./advancedCollectors";
import { completableFuture } from "./completableFuture";
import { java8InterviewPreparation } from "./java8InterviewPreparation";

export const java8Lessons = {
  [java8Fundamentals.id]: java8Fundamentals,
  [functionalProgrammingFundamentals.id]:
    functionalProgrammingFundamentals,
  [lambdaExpressions.id]: lambdaExpressions,
  [methodReferences.id]: methodReferences,
  [streamApiFundamentals.id]: streamApiFundamentals,
  [streamApiAdvanced.id]: streamApiAdvanced,
  [optional.id]: optional,
  [dateTimeApi.id]: dateTimeApi,
  [interfaceEnhancements.id]: interfaceEnhancements,
  [java8AdvancedConcepts.id]: java8AdvancedConcepts,
  [advancedCollectors.id]: advancedCollectors,
  [completableFuture.id]: completableFuture,
  [java8InterviewPreparation.id]: java8InterviewPreparation
};