class AbrigoAnimais {
    static dadosAnimais = new Map([
        ['Rex', { especie: 'cão', brinquedos: ['RATO', 'BOLA'] }],
        ['Mimi', { especie: 'gato', brinquedos: ['BOLA', 'LASER'] }],
        ['Fofo', { especie: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] }],
        ['Zero', { especie: 'gato', brinquedos: ['RATO', 'BOLA'] }],
        ['Bola', { especie: 'cão', brinquedos: ['CAIXA', 'NOVELO'] }],
        ['Bebe', { especie: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] }],
        ['Loco', { especie: 'jabuti', brinquedos: ['SKATE', 'RATO'] }],
    ]);

    static brinquedosValidos = new Set([
        'RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'
    ]);

    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
        try {
            const listaBrinquedosPessoa1 = this._processarString(brinquedosPessoa1);
            const listaBrinquedosPessoa2 = this._processarString(brinquedosPessoa2);
            const listaAnimaisConsiderados = this._processarString(ordemAnimais);

            this._validarBrinquedos(listaBrinquedosPessoa1);
            this._validarBrinquedos(listaBrinquedosPessoa2);
            this._validarAnimais(listaAnimaisConsiderados);

            const adocoes = { pessoa1: 0, pessoa2: 0 };
            const resultados = [];

            for (const nomeAnimal of listaAnimaisConsiderados) {
                const animal = AbrigoAnimais.dadosAnimais.get(nomeAnimal);

                let aptidaoPessoa1 = this._verificarCondicoesIndividuais(animal, listaBrinquedosPessoa1, adocoes.pessoa1);
                let aptidaoPessoa2 = this._verificarCondicoesIndividuais(animal, listaBrinquedosPessoa2, adocoes.pessoa2);

                if (aptidaoPessoa1 && aptidaoPessoa2) {
                    aptidaoPessoa1 = false;
                    aptidaoPessoa2 = false;
                }

                let destino = 'abrigo';

                if (aptidaoPessoa1) {
                    if (adocoes.pessoa1 < 3) {
                        destino = 'pessoa 1';
                        adocoes.pessoa1++;
                    }
                } else if (aptidaoPessoa2) {
                     if (adocoes.pessoa2 < 3) {
                        destino = 'pessoa 2';
                        adocoes.pessoa2++;
                    }
                }

                resultados.push(`${nomeAnimal} - ${destino}`);
            }

            resultados.sort();
            return { lista: resultados };

        } catch (error) {
            return { erro: error.message };
        }
    }

    _verificarCondicoesIndividuais(animal, brinquedosDaPessoa, numAdocoes) {
        const { especie, brinquedos: brinquedosDoAnimal } = animal;

        if (especie === 'jabuti') {
            const temCompanhia = numAdocoes > 0;
            const temTodosBrinquedos = brinquedosDoAnimal.every(b => brinquedosDaPessoa.includes(b));
            return temCompanhia && temTodosBrinquedos;
        }

        const temBrinquedosNaOrdem = this._checarOrdemBrinquedos(brinquedosDoAnimal, brinquedosDaPessoa);

        return temBrinquedosNaOrdem;
    }

    _processarString(str) {
        if (!str || typeof str !== 'string' || str.trim() === '') return [];
        return str.split(',').map(item => item.trim());
    }

    _validarBrinquedos(brinquedos) {
        const vistos = new Set();
        for (const brinquedo of brinquedos) {
            if (!AbrigoAnimais.brinquedosValidos.has(brinquedo) || vistos.has(brinquedo)) {
                throw new Error('Brinquedo inválido');
            }
            vistos.add(brinquedo);
        }
    }

    _validarAnimais(animais) {
        const vistos = new Set();
        for (const nomeAnimal of animais) {
            if (!AbrigoAnimais.dadosAnimais.has(nomeAnimal) || vistos.has(nomeAnimal)) {
                throw new Error('Animal inválido');
            }
            vistos.add(nomeAnimal);
        }
    }

    _checarOrdemBrinquedos(brinquedosDoAnimal, brinquedosDaPessoa) {
        let indiceUltimoEncontrado = -1;
        for (const brinquedoAnimal of brinquedosDoAnimal) {
            const indiceAtual = brinquedosDaPessoa.indexOf(brinquedoAnimal, indiceUltimoEncontrado + 1);
            if (indiceAtual === -1) {
                return false;
            }
            indiceUltimoEncontrado = indiceAtual;
        }
        return true;
    }
}


export { AbrigoAnimais as AbrigoAnimais };
