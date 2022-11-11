const checarDisponibilidadeItens = (id, item, quantidadeTotal, quantidadeUtilizada) => {
    if (quantidadeUtilizada > quantidadeTotal) {
        const err = `
        Foram requeridos ${quantidadeUtilizada} unidades do número_item ${item} do pedido ${id},
        mas só há ${quantidadeTotal} unidades desse produto. 
        `
        throw new Error(err);
    }
}

module.exports = checarDisponibilidadeItens;