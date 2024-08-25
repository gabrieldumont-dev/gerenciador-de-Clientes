import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor (
    private http: HttpClient,
    private dataService: DataService
  ) { }

  conta: any = {
    nome: "",
    email: "",
    senha: ""
  }

  msg: string = ""

  cadastrar(){
    if (!this.dataService.verificarObj(this.conta, [""])){
      this.msg = "Preencha todos os campos!"
      return
    }

    this.http.post(`${this.dataService.linkApi}/conta`, this.conta).subscribe((res: any) => {
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
