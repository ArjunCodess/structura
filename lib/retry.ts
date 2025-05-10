export type PromiseExecutor<T> = (
  resolve: (value: T | PromiseLike<T>) => void,
  reject: (reason?: unknown) => void
) => void;

/**
 * A utility class that extends Promise to provide retry functionality
 */
export class RetryablePromise<T> extends Promise<T> {
  /**
   * Retry a promise execution for a specified number of times
   * @param retries Number of retries to attempt
   * @param executor The promise executor function
   * @returns A promise that will be retried if it fails
   */
  static async retry<T>(
    retries: number,
    executor: PromiseExecutor<T>
  ): Promise<T> {
    return new RetryablePromise<T>(executor).catch((error) => {
      console.error(`Retrying due to error: ${error}`);
      return retries > 0
        ? RetryablePromise.retry(retries - 1, executor)
        : RetryablePromise.reject(error);
    });
  }
}