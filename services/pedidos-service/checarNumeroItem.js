const checarNumeroItem = (pedidos) => {
    pedidos.forEach((pedido) => {
        const biggestNum = pedido.items.sort((a, b) => b.número_item - a.número_item)[0].número_item;
        for (let index = 1; index <= biggestNum; index += 1) {
            if (!(pedido.items.some((obj) => obj.número_item === index))) {
                const error = `
                número_item ${index} não encontrado. Verifique os itens do pedido ${pedido.id}
                `
                throw new Error(error);
            }
        }
    })
}

module.exports = checarNumeroItem;