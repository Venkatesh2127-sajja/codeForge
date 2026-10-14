import { whatAreJpaRelationships } from "./whatAreJpaRelationships";
import { oneToOneRelationship } from "./oneToOneRelationship";
import { oneToManyRelationship } from "./oneToManyRelationship";
import { manyToOneRelationship } from "./manyToOneRelationship";
import { manyToManyRelationship } from "./manyToManyRelationship";
import { joinColumnAndForeignKeys } from "./joinColumnAndForeignKeys";
import { mappedByAndOwningSide } from "./mappedByAndOwningSide";
import { cascadeTypesInJpa } from "./cascadeTypesInJpa";
import { lazyVsEagerFetching } from "./lazyVsEagerFetching";
import { jpaRelationshipBestPractices } from "./jpaRelationshipBestPractices";

export const jpaRelationshipsLessons = {
  [whatAreJpaRelationships.id]: whatAreJpaRelationships,
  [oneToOneRelationship.id]: oneToOneRelationship,
  [oneToManyRelationship.id]: oneToManyRelationship,
  [manyToOneRelationship.id]: manyToOneRelationship,
  [manyToManyRelationship.id]: manyToManyRelationship,
  [joinColumnAndForeignKeys.id]: joinColumnAndForeignKeys,
  [mappedByAndOwningSide.id]: mappedByAndOwningSide,
  [cascadeTypesInJpa.id]: cascadeTypesInJpa,
  [lazyVsEagerFetching.id]: lazyVsEagerFetching,
  [jpaRelationshipBestPractices.id]: jpaRelationshipBestPractices
};