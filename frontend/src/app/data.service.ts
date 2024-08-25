import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private router: Router
  ) { }

  linkApi: string = "http://localhost:3000"

  openModel: any  = [false, false, false]
  clickModel: any = [false, false, false]

  closeModel(index: number){
    if (this.clickModel[index]){
      this.clickModel[index] = false
      return false
    } else {
      this.openModel[index] = false
      return true
    }
  }

  route(path: string){
    this.router.navigate([path])
  }

  verificarObj(obj: any, restricoes: any){
    for (let key in obj){
      if (obj[key] == ""){
        for (let i = 0; i < restricoes.length; i++){
          if (restricoes[i] == key){
            break
          }
          if (i + 1 == restricoes.length){
            return false
          }
        }
      }
    }
    return true
  }

}
