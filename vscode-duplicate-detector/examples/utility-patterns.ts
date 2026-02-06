// Examples of custom implementations that could be replaced with standard utilities

// Example 1: Deep cloning (could use structuredClone or Lodash _.cloneDeep)
export function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

export function cloneObject(source: any): any {
    return JSON.parse(JSON.stringify(source));
}

// Example 2: Array operations (could use Lodash)
export function mapArray<T, R>(arr: T[], fn: (item: T) => R): R[] {
    const result: R[] = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(fn(arr[i]));
    }
    return result;
}

export function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    const result: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}

// Example 3: Debouncing (could use Lodash _.debounce)
export function createDebounce(fn: Function, delay: number) {
    let timeoutId: NodeJS.Timeout | null = null;
    
    return function(...args: any[]) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export function debounceFunction(callback: Function, wait: number) {
    let timer: NodeJS.Timeout | null = null;
    
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer);
        }
        
        timer = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

// Example 4: Throttling (could use Lodash _.throttle)
export function throttle(fn: Function, limit: number) {
    let lastRun = 0;
    let timeout: NodeJS.Timeout | null = null;
    
    return function(...args: any[]) {
        const now = Date.now();
        
        if (now - lastRun >= limit) {
            fn(...args);
            lastRun = now;
        } else {
            if (timeout) {
                clearTimeout(timeout);
            }
            
            timeout = setTimeout(() => {
                fn(...args);
                lastRun = Date.now();
            }, limit - (now - lastRun));
        }
    };
}

// Example 5: Date formatting (could use date-fns or Moment.js)
export function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDateTime(date: Date): string {
    const dateStr = formatDate(date);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${dateStr} ${hours}:${minutes}`;
}

// Example 6: Object property access (could use Lodash _.get)
export function getNestedProperty(obj: any, path: string): any {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
        if (current === null || current === undefined) {
            return undefined;
        }
        current = current[key];
    }
    
    return current;
}

// Example 7: Array flattening (could use Array.flat() or Lodash _.flatten)
export function flattenArray(arr: any[]): any[] {
    const result: any[] = [];
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flattenArray(item));
        } else {
            result.push(item);
        }
    }
    
    return result;
}

// Example 8: Unique array values (could use Set or Lodash _.uniq)
export function uniqueValues<T>(arr: T[]): T[] {
    const seen = new Set<T>();
    const result: T[] = [];
    
    for (const item of arr) {
        if (!seen.has(item)) {
            seen.add(item);
            result.push(item);
        }
    }
    
    return result;
}

// Example 9: String truncation (could use Lodash _.truncate)
export function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength - 3) + '...';
}

// Example 10: Retry logic (could use async-retry or p-retry)
export async function retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
): Promise<T> {
    let lastError: Error | undefined;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error as Error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
    
    throw lastError;
}
