import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (
    private http: HttpClient,
    private dataService: DataService
  ) { }

  ngOnInit(){
    if (localStorage.getItem("conta")){
      this.getConta(localStorage.getItem("conta"))
    }
  }

  conta: any = {
    email: "",
    senha: ""
  }

  msg: string = ""

  getConta(_id: any){
    this.http.get(`${this.dataService.linkApi}/default-getOne/model_Conta/${_id}`).subscribe((res: any) => {
      this.conta.email = res.email
      this.conta.senha = res.senha
    }, (error) => {
      console.log(error)
    })
  }

  entrar(){
    if (!this.dataService.verificarObj(this.conta, [""])){
      this.msg = "Preencha todos os campos!"
      return
    }

    this.http.get(`${this.dataService.linkApi}/conta/${this.conta.email}/${this.conta.senha}`).subscribe((res: any) => {
      if (res.msg){
        this.msg = res.msg
      } else {
        localStorage.setItem("conta", res._id)
        this.dataService.route("/clientes")
      }
    }, (error) => {
      console.log(error)
    })
  }

}
