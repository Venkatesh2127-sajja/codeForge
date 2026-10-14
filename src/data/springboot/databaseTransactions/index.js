import { databaseFundamentals } from "./databaseFundamentals";
import { connectingSpringBootToMySQL } from "./connectingSpringBootToMySQL";
import { dataSourceAndConnectionPooling } from "./dataSourceAndConnectionPooling";
import { databaseSchemaManagement } from "./databaseSchemaManagement";
import { whatIsDatabaseTransaction } from "./whatIsDatabaseTransaction";
import { transactionalAnnotation } from "./transactionalAnnotation";
import { transactionPropagation } from "./transactionPropagation";
import { transactionIsolationLevels } from "./transactionIsolationLevels";
import { rollbackRules } from "./rollbackRules";
import { databaseTransactionBestPractices } from "./databaseTransactionBestPractices";

export const databaseTransactionsLessons = {
  [databaseFundamentals.id]: databaseFundamentals,
  [connectingSpringBootToMySQL.id]: connectingSpringBootToMySQL,
  [dataSourceAndConnectionPooling.id]: dataSourceAndConnectionPooling,
  [databaseSchemaManagement.id]: databaseSchemaManagement,
  [whatIsDatabaseTransaction.id]: whatIsDatabaseTransaction,
  [transactionalAnnotation.id]: transactionalAnnotation,
  [transactionPropagation.id]: transactionPropagation,
  [transactionIsolationLevels.id]: transactionIsolationLevels,
  [rollbackRules.id]: rollbackRules,
  [databaseTransactionBestPractices.id]: databaseTransactionBestPractices
};