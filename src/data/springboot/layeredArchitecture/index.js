import {
  whatIsLayeredArchitecture
} from "./whatIsLayeredArchitecture";

import {
  controllerLayer
} from "./controllerLayer";

import {
  serviceLayer
} from "./serviceLayer";

import {
  repositoryLayer
} from "./repositoryLayer";

import {
  entityAndDomainModel
} from "./entityAndDomainModel";

import {
  dtos
} from "./dtos";

import {
  entityVsDto
} from "./entityVsDto";

import {
  dependencyFlow
} from "./dependencyFlow";

import {
  buildingLayeredRestApi
} from "./buildingLayeredRestApi";

import {
  layeredArchitectureBestPractices
} from "./layeredArchitectureBestPractices";

export const layeredArchitectureLessons = {
  [whatIsLayeredArchitecture.id]:
    whatIsLayeredArchitecture,

  [controllerLayer.id]:
    controllerLayer,

  [serviceLayer.id]:
    serviceLayer,

  [repositoryLayer.id]:
    repositoryLayer,

  [entityAndDomainModel.id]:
    entityAndDomainModel,

  [dtos.id]:
    dtos,

  [entityVsDto.id]:
    entityVsDto,

  [dependencyFlow.id]:
    dependencyFlow,

  [buildingLayeredRestApi.id]:
    buildingLayeredRestApi,

  [layeredArchitectureBestPractices.id]:
    layeredArchitectureBestPractices
};