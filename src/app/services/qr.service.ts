import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * add
   */
  public add(qr: string): number {
    alert("Este es el qr: " + qr);
    let result: number = 0;
    
    return result;
  }
}
