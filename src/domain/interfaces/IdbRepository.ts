
export interface IdbRepository {
    all: ()=> Promise<any[]>;
    filter: (...args: any[]) => Promise<any[]>;
    save: (model: any) => Promise<any>;
}