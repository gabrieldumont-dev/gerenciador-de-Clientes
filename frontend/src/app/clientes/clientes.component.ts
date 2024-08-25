import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import moment from 'moment';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask({})],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {

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

  clientes: any = []
  cliente: any  = {
    id_conta: localStorage.getItem("conta"),
    nome: "",
    telefone: "",
    email: ""
  }

  pedidos: any = []
  pedido: any = {
    id_conta: localStorage.getItem("conta"),
    id_cliente: "",
    data: "",
    total: 0,
    produtos: []
  }

  produtos: any = []

  produtoSelect: any = ""
  
  msg: string = ""

  abrirConversa(cliente: any){
    window.open(`https://web.whatsapp.com/send?phone=55${cliente.telefone}`)
  }

  togglePedidos(cliente: any){
    if (cliente.toggle){
      cliente.toggle = false
    } else {
      cliente.toggle = true
    }
  }

  novoPedido(cliente: any){
    this.dataService.openModel[1] = true
    this.pedido.id_cliente = cliente._id
  }

  addProduto(){
    if (this.produtoSelect == ""){
      return
    }
    
    const produtoSelecionado = this.produtos.find((item: any) => item._id == this.produtoSelect)
    this.produtoSelect = ""
    
    this.pedido.produtos.push({
      nome: produtoSelecionado.nome,
      preco: produtoSelecionado.preco,
      total: produtoSelecionado.preco, 
      quantidade: 1
    })

    this.calcularTotal()
  }

  altararQuantidadeProduto(index: number, operador: string){
    if (operador == "-" && this.pedido.produtos[index].quantidade == 1){
      return
    }

    this.pedido.produtos[index].quantidade  = eval(`${this.pedido.produtos[index].quantidade}${operador}1`)
    this.pedido.produtos[index].total       = this.pedido.produtos[index].quantidade * this.pedido.produtos[index].preco
    
    this.calcularTotal()
  }

  calcularTotal(){
    this.pedido.total = 0
    for (const item of this.pedido.produtos){
      this.pedido.total += item.quantidade * item.preco
    }
  }

  removerProduto(index: number){
    this.pedido.produtos.splice(index, 1)
    this.calcularTotal()
  }

  editCliente(cliente: any){
    this.cliente = cliente
    this.dataService.openModel[0] = true
  }

  editPedido(pedido: any){
    this.pedido = pedido
    this.dataService.openModel[1] = true
  }

  getConta(_id: any){
    this.http.get(`${this.dataService.linkApi}/default-getOne/model_Conta/${_id}`).subscribe((res: any) => {
      this.conta = res
      this.getClientes()
      this.getProdutos()
    }, (error) => {
      console.log(error)
    })
  }

  getClientes(){
    this.http.get(`${this.dataService.linkApi}/default/model_Clientes/${this.conta._id}`).subscribe((res: any) => {
      this.clientes = res
      for (const cliente of this.clientes){
        this.http.get(`${this.dataService.linkApi}/pedidos/${cliente._id}`).subscribe((res: any) => {
          for (const pedido of res){
            pedido.data = moment(pedido.data).format("DD-MM-YYY HH:mm")
          }
          cliente.pedidos = res
        }, (error) => {
          console.log(error)
        })
      }
    }, (error) => {
      console.log(error)
    })
  }

  getProdutos(){
    this.http.get(`${this.dataService.linkApi}/default/model_Produtos/${this.conta._id}`).subscribe((res: any) => {
      this.produtos = res
    }, (error) => {
      console.log(error)
    })
  }

  postCliente(){
    if (!this.dataService.verificarObj(this.cliente, ["__v"])){
      this.msg = "Preencha todos os campos!"
      return
    }

    if (this.cliente._id){
      this.http.put(`${this.dataService.linkApi}/default/model_Clientes/${this.cliente._id}`, this.cliente).subscribe((res: any) => {
        this.getClientes()
        this.cancelarCliente()
      }, (error) => {
        console.log(error)
      })
    } else {
      this.http.post(`${this.dataService.linkApi}/default/model_Clientes`, this.cliente).subscribe((res: any) => {
        this.getClientes()
        this.cancelarCliente()
      }, (error) => {
        console.log(error)
      })
    }
  }

  postPedido(){
    if (this.pedido.produtos.length == 0){
      return
    }

    if (this.pedido._id){
      this.http.put(`${this.dataService.linkApi}/default/model_Pedidos/${this.pedido._id}`, this.pedido).subscribe((res: any) => {
        this.getClientes()
        this.cancelarPedido()
      }, (error) => {
        console.log(error)
      })
    } else {
      this.pedido.data = moment()

      this.http.post(`${this.dataService.linkApi}/default/model_Pedidos`, this.pedido).subscribe((res: any) => {
        this.getClientes()
        this.cancelarPedido()
      }, (error) => {
        console.log(error)
      })
    }
  }

  deleteCliente(){
    this.http.delete(`${this.dataService.linkApi}/default/model_Clientes/${this.cliente._id}`).subscribe((res: any) => {
      this.http.delete(`${this.dataService.linkApi}/pedidos/${this.cliente._id}`).subscribe((res: any) => {
        this.getClientes()
        this.cancelarCliente()
      }, (error) => {
        console.log(error)
      })
    }, (error) => {
      console.log(error)
    })
  }

  deletePedido(){
    this.http.delete(`${this.dataService.linkApi}/default/model_Pedidos/${this.pedido._id}`).subscribe((res: any) => {
      this.getClientes()
      this.cancelarPedido()
    }, (error) => {
      console.log(error)
    })
  }

  cancelarCliente(){
    if (this.dataService.closeModel(0)){
      setTimeout(() => {
        this.cliente = {
          id_conta: localStorage.getItem("conta"),
          nome: "",
          telefone: "",
          email: ""
        }
      }, 300);
      this.dataService.closeModel(0)
    }
  }

  cancelarPedido(){
    if (this.dataService.closeModel(1)){
      setTimeout(() => {
        this.pedido = {
          id_conta: localStorage.getItem("conta"),
          id_cliente: "",
          data: "",
          total: 0,
          produtos: []
        }
      }, 300);
      this.dataService.closeModel(1)
    }
  }

}
