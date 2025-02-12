// Elementos da tela e botões
const tela = document.querySelector('.tela');
const botoes = document.querySelectorAll('button');
let valorAtual = '0';
let valorAnterior = null;
let operador = null;

// Evento de clique a todos os botões
botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.dataset.valor;
        
        if (!isNaN(valor) || valor === '.') { // Números e ponto decimal
            if (valorAtual === '0' && valor !== '.') {
                valorAtual = valor;
            } else {
                valorAtual += valor;
            }
        } else if (valor === 'C') { // Limpar
            valorAtual = '0';
            valorAnterior = null;
            operador = null;
        } else if (valor === '±') { // Inverter sinal
            valorAtual = (parseFloat(valorAtual) * -1).toString();
        } else if (valor === '=') { // Calcular
            if (valorAnterior && operador) {
                valorAtual = calcular(
                    parseFloat(valorAnterior),
                    parseFloat(valorAtual),
                    operador
                ).toString();
                valorAnterior = null;
            }
        } else { // Operadores
            operador = valor;
            valorAnterior = valorAtual;
            valorAtual = '0';
        }
        
        tela.textContent = valorAtual;
    });
});

// Função para cálculos 
function calcular(a, b, operacao) {
    switch(operacao) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Erro';
        case '%': return a % b;
        default: return b;
    }
}