import { whatIsSpringSecurity } from "./whatIsSpringSecurity";
import { authenticationVsAuthorization } from "./authenticationVsAuthorization";
import { springSecurityArchitecture } from "./springSecurityArchitecture";
import { securityFilterChain } from "./securityFilterChain";
import { configuringSecurityFilterChain } from "./configuringSecurityFilterChain";
import { passwordEncoding } from "./passwordEncoding";
import { userDetailsAndUserDetailsService } from "./userDetailsAndUserDetailsService";
import { endpointAuthorization } from "./endpointAuthorization";
import { csrfProtection } from "./csrfProtection";
import { corsAndSecurityBestPractices } from "./corsAndSecurityBestPractices";

export const springSecurityLessons = {
  [whatIsSpringSecurity.id]: whatIsSpringSecurity,
  [authenticationVsAuthorization.id]: authenticationVsAuthorization,
  [springSecurityArchitecture.id]: springSecurityArchitecture,
  [securityFilterChain.id]: securityFilterChain,
  [configuringSecurityFilterChain.id]: configuringSecurityFilterChain,
  [passwordEncoding.id]: passwordEncoding,
  [userDetailsAndUserDetailsService.id]: userDetailsAndUserDetailsService,
  [endpointAuthorization.id]: endpointAuthorization,
  [csrfProtection.id]: csrfProtection,
  [corsAndSecurityBestPractices.id]: corsAndSecurityBestPractices
};