export class User {

    private email: string;
    private type: string;
    private credit: number;

    constructor(email: string, type:string, credit: number = 0){

    }

    
    public get Email() : string {
        return this.email; 
    }

    
    public get Type() : string {
        return this.type;
    }

    
    public get Credit() : number {
        return this.credit;
    }
    
    
    public set Email(v : string) {
        this.email = v;
    }

    
    public set Type(v : string) {
        this.type = v;
    }

    
    public set Credit(v : number) {
        this.credit = v;
    }
    
    
    
    
}
