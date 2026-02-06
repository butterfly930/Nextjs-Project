// Example: Similar class implementations that could share a base class

export class UserManager {
    private users: Map<string, any>;
    
    constructor() {
        this.users = new Map();
    }
    
    add(id: string, data: any): void {
        if (!id || !data) {
            throw new Error('Invalid input');
        }
        this.users.set(id, data);
    }
    
    get(id: string): any | undefined {
        if (!id) {
            return undefined;
        }
        return this.users.get(id);
    }
    
    remove(id: string): boolean {
        if (!id) {
            return false;
        }
        return this.users.delete(id);
    }
    
    exists(id: string): boolean {
        return this.users.has(id);
    }
    
    getAll(): any[] {
        return Array.from(this.users.values());
    }
}

export class ProductManager {
    private products: Map<string, any>;
    
    constructor() {
        this.products = new Map();
    }
    
    add(id: string, data: any): void {
        if (!id || !data) {
            throw new Error('Invalid input');
        }
        this.products.set(id, data);
    }
    
    get(id: string): any | undefined {
        if (!id) {
            return undefined;
        }
        return this.products.get(id);
    }
    
    remove(id: string): boolean {
        if (!id) {
            return false;
        }
        return this.products.delete(id);
    }
    
    exists(id: string): boolean {
        return this.products.has(id);
    }
    
    getAll(): any[] {
        return Array.from(this.products.values());
    }
}

export class OrderManager {
    private orders: Map<string, any>;
    
    constructor() {
        this.orders = new Map();
    }
    
    add(id: string, data: any): void {
        if (!id || !data) {
            throw new Error('Invalid input');
        }
        this.orders.set(id, data);
    }
    
    get(id: string): any | undefined {
        if (!id) {
            return undefined;
        }
        return this.orders.get(id);
    }
    
    remove(id: string): boolean {
        if (!id) {
            return false;
        }
        return this.orders.delete(id);
    }
    
    exists(id: string): boolean {
        return this.orders.has(id);
    }
    
    getAll(): any[] {
        return Array.from(this.orders.values());
    }
}

// Another example: Similar data validation classes

export class UserValidator {
    validate(data: any): boolean {
        if (!data) {
            return false;
        }
        
        if (!data.name || typeof data.name !== 'string') {
            return false;
        }
        
        if (!data.email || typeof data.email !== 'string') {
            return false;
        }
        
        if (data.age && typeof data.age !== 'number') {
            return false;
        }
        
        return true;
    }
    
    validateRequired(data: any, fields: string[]): boolean {
        for (const field of fields) {
            if (!data[field]) {
                return false;
            }
        }
        return true;
    }
}

export class ProductValidator {
    validate(data: any): boolean {
        if (!data) {
            return false;
        }
        
        if (!data.name || typeof data.name !== 'string') {
            return false;
        }
        
        if (!data.price || typeof data.price !== 'number') {
            return false;
        }
        
        if (data.quantity && typeof data.quantity !== 'number') {
            return false;
        }
        
        return true;
    }
    
    validateRequired(data: any, fields: string[]): boolean {
        for (const field of fields) {
            if (!data[field]) {
                return false;
            }
        }
        return true;
    }
}
