import { whatIsSpringDataJpa } from "./whatIsSpringDataJpa";
import { jpaAndHibernate } from "./jpaAndHibernate";
import { entityAndEntity } from "./entityAndEntity";
import { idAndPrimaryKeys } from "./idAndPrimaryKeys";
import { jpaRepository } from "./jpaRepository";
import { repositoryQueryMethods } from "./repositoryQueryMethods";
import { queryAndJpql } from "./queryAndJpql";
import { paginationAndSorting } from "./paginationAndSorting";
import { crudOperationsWithJpa } from "./crudOperationsWithJpa";
import { springDataJpaBestPractices } from "./springDataJpaBestPractices";

export const springDataJpaLessons = {
  [whatIsSpringDataJpa.id]: whatIsSpringDataJpa,

  [jpaAndHibernate.id]: jpaAndHibernate,

  [entityAndEntity.id]: entityAndEntity,

  [idAndPrimaryKeys.id]: idAndPrimaryKeys,

  [jpaRepository.id]: jpaRepository,

  [repositoryQueryMethods.id]:
    repositoryQueryMethods,

  [queryAndJpql.id]:
    queryAndJpql,

  [paginationAndSorting.id]:
    paginationAndSorting,

  [crudOperationsWithJpa.id]:
    crudOperationsWithJpa,

  [springDataJpaBestPractices.id]:
    springDataJpaBestPractices
};