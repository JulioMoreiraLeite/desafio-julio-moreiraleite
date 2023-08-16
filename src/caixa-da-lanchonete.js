//Entradas de codigo e preço
const itens = [
    { codigo: "cafe", preco: 3.00 },
    { codigo: "chantily", preco: 1.50 },
    { codigo: "suco", preco: 6.20 },
    { codigo: "sanduiche", preco: 6.50 },
    { codigo: "queijo", preco: 2.00 },
    { codigo: "salgado", preco: 7.25 },
    { codigo: "combo1", preco: 9.50 },
    { codigo: "combo2", preco: 7.50 },
  ];
  //Verificação de itens disponiveis
  const arrayItensDisponiveis = [
    "cafe",
    "chantily",
    "suco",
    "sanduiche",
    "queijo",
    "salgado",
    "combo1",
    "combo2",
  ];
  //Seleção de método de compra
  class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
      if (metodoDePagamento === "dinheiro") {
        return pagamentoDinheiro(itens);
      } else if (metodoDePagamento === "credito") {
        return pagamentoCredito(itens);
      } else if (metodoDePagamento === "debito") {
        return pagamentoDebito(itens);
      } else {
        return "Forma de pagamento inválida!";
      }
    }
  }
    //PAG DÉBITO
  const pagamentoDebito = (array) => {
    let valorTotal = 0;
    const arrayFormatado = array.toString().split(",");
  //Se for menor que 1 não tem itens
    if (!array.length) {
      return "Não há itens no carrinho de compra!";
    }
   //Verifica se o item existe nos produtos
    if (!verificarItemInvalido(array)) {
      return "Item inválido!";
    }
   //Verifica se os adicionais foram colocados sem o produto principal
       if (verificarItemPrincipal(arrayFormatado) === false) {
      return "Item extra não pode ser pedido sem o principal";
    }
   //loop de formação
    for (let i = 0; i < arrayFormatado.length; i++) {
      if (i % 2 === 0) {
        if (arrayFormatado[i + 1] === "0") {
          return "Quantidade inválida!";
        } else {
          let item = itens.find((item) => item.codigo === arrayFormatado[i]);
          const novoItem = new Item(item.codigo, item.preco);
          valorTotal +=
            parseFloat(novoItem.preco) * parseInt(arrayFormatado[i + 1]);
        }
      }
    }
    //TOFIXED para deixar com , e 2 casas pós virgula
    const stringValorTotal = String(valorTotal.toFixed(2)).replace(".", ",");
    return `R$ ${stringValorTotal}`;
  };
   //PAG CRÉDITO
  const pagamentoCredito = (array) => {
    let valorTotal = 0;
    let valorAcrescimo = 0;
    const arrayFormatado = array.toString().split(",");
  
    if (!array.length) {
      return "Não há itens no carrinho de compra!";
    }
  
    if (!verificarItemInvalido(array)) {
      return "Item inválido!";
    }
  
    if (verificarItemPrincipal(arrayFormatado) === false) {
      return "Item extra não pode ser pedido sem o principal";
    }
  
    for (let i = 0; i < arrayFormatado.length; i++) {
      if (i % 2 === 0) {
        if (arrayFormatado[i + 1] === "0") {
          return "Quantidade inválida!";
        } else {
          let item = itens.find((item) => item.codigo === arrayFormatado[i]);
          const novoItem = new Item(item.codigo, item.preco);
          valorTotal += parseFloat(novoItem.preco) * arrayFormatado[i + 1];
        }
      }
    }
    valorAcrescimo = valorTotal * 0.03;
    const valorTotalComAcrescimo = valorTotal + valorAcrescimo;
    const stringValorTotalComAcrescimo = String(
      valorTotalComAcrescimo.toFixed(2)
    ).replace(".", ",");
    return `R$ ${stringValorTotalComAcrescimo}`;
  };
  //PAG DINHEIRO
  const pagamentoDinheiro = (array) => {
    let valorTotal = 0;
    let valorDesconto = 0;
    const arrayFormatado = array.toString().split(",");
  
    if (!array.length) {
      return "Não há itens no carrinho de compra!";
    }
  
    if (!verificarItemInvalido(array)) {
      return "Item inválido!";
    }
  
    if (verificarItemPrincipal(arrayFormatado) === false) {
      return "Item extra não pode ser pedido sem o principal";
    }
  
    for (let i = 0; i < arrayFormatado.length; i++) {
      if (i % 2 === 0) {
        if (arrayFormatado[i + 1] === "0") {
          return "Quantidade inválida!";
        } else {
          let item = itens.find((item) => item.codigo === arrayFormatado[i]);
          const novoItem = new Item(item.codigo, item.preco);
          valorTotal += parseFloat(novoItem.preco) * arrayFormatado[i + 1];
        }
      }
    }
    valorDesconto = valorTotal * 0.05;
    const valorTotalComDesconto = valorTotal - valorDesconto;
    const stringValorTotalComDesconto = String(
      valorTotalComDesconto.toFixed(2)
    ).replace(".", ",");
    return `R$ ${stringValorTotalComDesconto}`;
  };
  
  class Item {
    constructor(nome, preco) {
      this.nome = nome;
      this.preco = preco;
    }
  }
  
  const verificarItemInvalido = (array) => {
    let itens = array.toString().split(",");
    let itensAceitos;
    let novoArray = [];
  
    for (let i = 0; i < itens.length; i++) {
      if (i % 2 == 0) {
        novoArray.push(itens[i]);
        for (let j = 0; j < novoArray.length; j++) {
          if (arrayItensDisponiveis.includes(novoArray[j])) {
            itensAceitos = true;
          } else {
            itensAceitos = false;
            break;
          }
        }
      }
    }
    return itensAceitos;
  };
  
  //Verificação dos adiocionais
  const verificarItemPrincipal = (array) => {
    let existeItem;
  
    const hasQueijo = array.includes("queijo");
    const hasSanduiche = array.includes("sanduiche");
    const hasChantily = array.includes("chantily");
    const hasCafe = array.includes("cafe");
  
    if ((hasQueijo && !hasSanduiche) || (hasChantily && !hasCafe)) {
      existeItem = false;
    }
  
    if (array.includes("combo1") || array.includes("combo2")) {
      existeItem = ["suco", "cafe", "salgado", "sanduiche"].some((item) =>
        array.includes(item)
      );
    }
  
    return existeItem;
  };
  

  //Testes
  const x = new CaixaDaLanchonete();
  const y = new CaixaDaLanchonete();
  const z = new CaixaDaLanchonete();
  console.log(x.calcularValorDaCompra("debito", ['chantily,1']));
  console.log(y.calcularValorDaCompra('debito', ['cafe,1','chantily,1']));
  console.log(z.calcularValorDaCompra('credito', ['combo1,1','cafe,2']));
  
  export { CaixaDaLanchonete };