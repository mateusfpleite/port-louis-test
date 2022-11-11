const checarRepeticaoNumeroItem = (pedidos) => {
    pedidos.forEach((pedido) => {
        pedido.items.forEach((obj, index) => {
            if (pedido.items.some((obj2, i)  => (obj.número_item === obj2.número_item) && index !== i)) {
                const error = `
                Não deve haver dois número_item idênticos no mesmo pedido. 
                Verifique os itens do pedido ${pedido.id}
                `
                throw new Error (error)
            }
        } )
    });
}

module.exports = checarRepeticaoNumeroItem;