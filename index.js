const getJson = require('./utils/getJson');
const fs = require('fs/promises');
const checarRepeticaoNumeroItem = require('./services/pedidos-service/checarRepeticaoNumeroItem');
const checarNumeroItem = require('./services/pedidos-service/checarNumeroItem');
const checarDadosNota = require('./services/notas-service/checarDadosNota');
const gerarItensPendentes = require('./services/gerarItensPendentes');

const notasDir = './Notas';
const pedidosDir = './Pedidos';

async function gerarProdutosPendentes() {
    const pedidos = await getJson(pedidosDir);
    const notas = await getJson(notasDir);
    checarRepeticaoNumeroItem(pedidos);
    checarNumeroItem(pedidos);
    await checarDadosNota(notas);
    const itensPendentes = gerarItensPendentes(pedidos, notas);
    const pedidosPendentes = itensPendentes.map((item) => {
        const valorSaldo = item.itens_pendentes.reduce((acc, curr) => acc + (curr.saldo_quantidade * Number(curr.valor_unitário_produto.replace(',', '.'))), 0).toFixed(2);
        const infoItens = item.itens_pendentes.map((i) => (
            { número_item: i.número_item, saldo_quantidade: i.saldo_quantidade }
        ));
        return {
            id: item.id,
            valor_total: item.valor_total,
            valor_saldo: valorSaldo,
            itens_pendentes: infoItens,
        }
    })
    for await (const pedido of pedidosPendentes) {
        if (pedidosPendentes.indexOf(pedido) === 0) {await fs.writeFile('pedidos_pendentes.txt', '')}
        await fs.writeFile('pedidos_pendentes.txt', JSON.stringify(pedido), {flag: 'a+'});
        await fs.writeFile('pedidos_pendentes.txt', `
`, {flag: 'a+'});
    }
};

gerarProdutosPendentes();