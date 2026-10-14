import { whatIsMultithreading } from "./whatIsMultithreading";
import { processVsThread } from "./processVsThread";
import { whyMultithreading } from "./whyMultithreading";
import { threadLifecycle } from "./threadLifecycle";
import { threadStates } from "./threadStates";

import { creatingThread } from "./creatingThread";
import { threadClass } from "./threadClass";
import { runnableInterface } from "./runnableInterface";
import { callableInterface } from "./callableInterface";
import { futureMethods } from "./futureMethods";

import { executorFramework } from "./executorFramework";
import { executorExecute } from "./executorExecute";
import { executorSubmit } from "./executorSubmit";
import { executorShutdown } from "./executorShutdown";
import { executorTypes } from "./executorTypes";
import { scheduledExecutorService } from "./scheduledExecutorService";

import { threadPoolExecutor } from "./threadPoolExecutor";
import { rejectedExecutionHandler } from "./rejectedExecutionHandler";
import { threadFactory } from "./threadFactory";
import { threadPoolConfiguration } from "./threadPoolConfiguration";
import { threadPoolSizing } from "./threadPoolSizing";
import { blockingQueue } from "./blockingQueue";
import { threadPoolTaskSubmission } from "./threadPoolTaskSubmission";
import { executeVsSubmit } from "./executeVsSubmit";
import { futureTask } from "./futureTask";
import { futureTaskVsCompletableFuture } from "./futureTaskVsCompletableFuture";

import { synchronization } from "./synchronization";
import { interThreadCommunication } from "./interThreadCommunication";
import { javaMemoryModel } from "./javaMemoryModel";
import { lockApi } from "./lockApi";
import { atomicOperations } from "./atomicOperations";
import { concurrentCollections } from "./concurrentCollections";
import { synchronizers } from "./synchronizers";
import { completableFuture } from "./completableFuture";
import { deadlockAndConcurrencyProblems } from "./deadlockAndConcurrencyProblems";
import { threadLocalAndSpringThreadSafety } from "./threadLocalAndSpringThreadSafety";
import { virtualThreads } from "./virtualThreads";
import { multithreadingInterviewScenarios } from "./multithreadingInterviewScenarios";

export const multithreadingLessons = {
  // 601–605: Fundamentals
  [whatIsMultithreading.id]: whatIsMultithreading,
  [processVsThread.id]: processVsThread,
  [whyMultithreading.id]: whyMultithreading,
  [threadLifecycle.id]: threadLifecycle,
  [threadStates.id]: threadStates,

  // 606–610: Thread Creation and Future
  [creatingThread.id]: creatingThread,
  [threadClass.id]: threadClass,
  [runnableInterface.id]: runnableInterface,
  [callableInterface.id]: callableInterface,
  [futureMethods.id]: futureMethods,

  // 611–616: Executor Framework
  [executorFramework.id]: executorFramework,
  [executorExecute.id]: executorExecute,
  [executorSubmit.id]: executorSubmit,
  [executorShutdown.id]: executorShutdown,
  [executorTypes.id]: executorTypes,
  [scheduledExecutorService.id]:
    scheduledExecutorService,

  // 617–626: Thread Pool and Future Concepts
  [threadPoolExecutor.id]: threadPoolExecutor,
  [rejectedExecutionHandler.id]:
    rejectedExecutionHandler,
  [threadFactory.id]: threadFactory,
  [threadPoolConfiguration.id]:
    threadPoolConfiguration,
  [threadPoolSizing.id]: threadPoolSizing,
  [blockingQueue.id]: blockingQueue,
  [threadPoolTaskSubmission.id]:
    threadPoolTaskSubmission,
  [executeVsSubmit.id]: executeVsSubmit,
  [futureTask.id]: futureTask,
  [futureTaskVsCompletableFuture.id]:
    futureTaskVsCompletableFuture,

  // 627–638: Advanced Multithreading
  [synchronization.id]: synchronization,

  [interThreadCommunication.id]:
    interThreadCommunication,

  [javaMemoryModel.id]: javaMemoryModel,

  [lockApi.id]: lockApi,

  [atomicOperations.id]: atomicOperations,

  [concurrentCollections.id]:
    concurrentCollections,

  [synchronizers.id]: synchronizers,

  [completableFuture.id]: completableFuture,

  [deadlockAndConcurrencyProblems.id]:
    deadlockAndConcurrencyProblems,

  [threadLocalAndSpringThreadSafety.id]:
    threadLocalAndSpringThreadSafety,

  [virtualThreads.id]: virtualThreads,

  [multithreadingInterviewScenarios.id]:
    multithreadingInterviewScenarios
};