import { whatIsRest } from "./whatIsRest";
import { httpFundamentals } from "./httpFundamentals";
import { httpMethods } from "./httpMethods";
import { httpStatusCodes } from "./httpStatusCodes";
import { restApiArchitecture } from "./restApiArchitecture";
import { restController } from "./restController";
import { requestMapping } from "./requestMapping";
import { getAndPostMapping } from "./getAndPostMapping";
import {
  pathVariableRequestParamRequestBody
} from "./pathVariableRequestParamRequestBody";
import {
  buildingCompleteRestApi
} from "./buildingCompleteRestApi";

export const restApiLessons = {
  [whatIsRest.id]: whatIsRest,

  [httpFundamentals.id]: httpFundamentals,

  [httpMethods.id]: httpMethods,

  [httpStatusCodes.id]: httpStatusCodes,

  [restApiArchitecture.id]: restApiArchitecture,

  [restController.id]: restController,

  [requestMapping.id]: requestMapping,

  [getAndPostMapping.id]: getAndPostMapping,

  [pathVariableRequestParamRequestBody.id]:
    pathVariableRequestParamRequestBody,

  [buildingCompleteRestApi.id]:
    buildingCompleteRestApi
};