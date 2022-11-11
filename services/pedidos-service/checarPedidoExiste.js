const getJson = require("../../utils/getJson");

const checarPedidoExiste = async (id, numero) => {
    const pedidosDir = './Pedidos';
    const pedidos = await getJson(pedidosDir); 
    return pedidos.some((pedido) => pedido.id === id && pedido.items.some((obj) => obj.número_item === numero));
}

module.exports = checarPedidoExiste;