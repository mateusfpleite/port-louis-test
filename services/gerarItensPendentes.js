const checarDisponibilidadeItens = require("./pedidos-service/checarDisponibilidadeItens");

const gerarItensPendentes = (pedidos, notas) => {
    const itensPendentes = pedidos.map((pedido) => {
        const id = Number(pedido.id.replace('P', ''));
        const notasPedido = notas.map((obj) => obj.items.filter((n) => n.id_pedido === id)).flat();
        const items = pedido.items.map((item) => {
            const { número_item, quantidade_produto: quantidade, valor_unitário_produto } = item;
            const notasItem = notasPedido.filter((n) => n.número_item === número_item);
            const quantidadeUtilizada = notasItem.reduce((acc, curr) => acc + curr.quantidade_produto, 0)
            checarDisponibilidadeItens(pedido.id, número_item, quantidade, quantidadeUtilizada);
            return {
                número_item,
                saldo_quantidade: quantidade - quantidadeUtilizada, 
                quantidade,
                valor_unitário_produto
            }
        }).filter((item) => item.saldo_quantidade > 0);
        const valor_total = pedido.items.reduce((acc, curr) => acc + (curr.quantidade_produto * Number(curr.valor_unitário_produto.replace(',', '.'))), 0).toFixed(2);
        return {
            id: pedido.id,
            valor_total,
            itens_pendentes: items,
        }
    });
    return itensPendentes.filter((item) => item.itens_pendentes.length);
}

module.exports = gerarItensPendentes;