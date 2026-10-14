import { inversionOfControl } from "./inversionOfControl";
import { dependencyInjection } from "./dependencyInjection";
import { springBean } from "./springBean";
import { applicationContext } from "./applicationContext";
import { componentScanning } from "./componentScanning";
 import { componentAnnotations } from "./componentAnnotations";

import { autowired } from "./autowired";
import { constructorInjection } from "./constructorInjection";
import { beanScopes } from "./beanScopes";
import { beanLifecycle } from "./beanLifecycle";

export const springCoreLessons = {
  [inversionOfControl.id]: inversionOfControl,

  [dependencyInjection.id]: dependencyInjection,

  [springBean.id]: springBean,

  [applicationContext.id]: applicationContext,

  [componentScanning.id]: componentScanning,

  [componentAnnotations.id]: componentAnnotations,

  [autowired.id]: autowired,

  [constructorInjection.id]: constructorInjection,

  [beanScopes.id]: beanScopes,

  [beanLifecycle.id]: beanLifecycle
};