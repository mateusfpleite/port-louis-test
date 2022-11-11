const checarPedidoExiste = require("../pedidos-service/checarPedidoExiste");

const checarDadosNota = async (notas) => {
    await Promise.all(
        notas.map(async (nota) => await Promise.all(
            nota.items.map(
                async ({ id_pedido, número_item }) => {
                    const test = await checarPedidoExiste(`P${id_pedido}`, número_item)
                    if (!test) {
                        const error = `
                    Não foi possível encontrar pedido com id P${id_pedido} e número_item ${número_item}.
                    Verifique os itens da nota ${nota.id}`
                        throw new Error(error);
                    }
                }))));
}

module.exports = checarDadosNota; 