import { applicationProperties } from "./applicationProperties";
import { applicationYml } from "./applicationYml";
import { propertiesVsYaml } from "./propertiesVsYaml";
import { valueAnnotation } from "./valueAnnotation";
import { environmentVariables } from "./environmentVariables";
import { springProfiles } from "./springProfiles";
import { configurationProperties } from "./configurationProperties";
import { externalizedConfiguration } from "./externalizedConfiguration";
import { configurationBestPractices } from "./configurationBestPractices";

export const configurationLessons = {
  [applicationProperties.id]: applicationProperties,

  [applicationYml.id]: applicationYml,

  [propertiesVsYaml.id]: propertiesVsYaml,

  [valueAnnotation.id]: valueAnnotation,

  [environmentVariables.id]: environmentVariables,

  [springProfiles.id]: springProfiles,

  [configurationProperties.id]: configurationProperties,

  [externalizedConfiguration.id]: externalizedConfiguration,

  [configurationBestPractices.id]:
    configurationBestPractices
};