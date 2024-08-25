import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  constructor (
    public dataService: DataService,
    private http: HttpClient
  ) { }

  ngOnInit(){
    if (localStorage.getItem("conta")){
      this.getConta(localStorage.getItem("conta"))
    } else {
      this.dataService.route("/")
    }
  }

  conta: any = {}

  produtos: any = []
  produto: any  = {
    id_conta: localStorage.getItem("conta"),
    nome: "",
    preco: ""
  }

  msg: string = ""

  editProduto(produto: any){
    this.produto = produto
    this.dataService.openModel[2] = true
  }

  getConta(_id: any){
    this.http.get(`${this.dataService.linkApi}/default-getOne/model_Conta/${_id}`).subscribe((res: any) => {
      this.conta = res
      this.getProdutos()
    }, (error) => {
      console.log(error)
    })
  }

  getProdutos(){
    this.http.get(`${this.dataService.linkApi}/default/model_Produtos/${this.conta._id}`).subscribe((res: any) => {
      this.produtos = res
      for (const item of this.produtos){
        item.preco = item.preco.toFixed(2).replace(".", ",")
      }
    }, (error) => {
      console.log(error)
    })
  }

  postProduto(){
    if (!this.dataService.verificarObj(this.produto, ["__v"])){
      this.msg = "Preencha todos os campos!"
      return
    }

    if (this.produto._id){
      this.http.put(`${this.dataService.linkApi}/default/model_Produtos/${this.produto._id}`, this.produto).subscribe((res: any) => {
        this.getProdutos()
        this.cancelar(2)
      }, (error) => {
        console.log(error)
      })
    } else {
      this.http.post(`${this.dataService.linkApi}/default/model_Produtos`, this.produto).subscribe((res: any) => {
        this.getProdutos()
        this.cancelar(2)
      }, (error) => {
        console.log(error)
      })
    }
  }

  deleteProduto(){
    this.http.delete(`${this.dataService.linkApi}/default/model_Produtos/${this.produto._id}`).subscribe((res: any) => {
      this.getProdutos()
      this.cancelar(2)
    }, (error) => {
      console.log(error)
    })
  }

  cancelar(index: number){
    if (this.dataService.closeModel(index)){
      setTimeout(() => {
        this.produto = {
          id_conta: localStorage.getItem("conta"),
          nome: "",
          preco: ""
        }
      }, 300);
      this.dataService.closeModel(index)
    }
  }

}
