import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  // Testes adicionais

  test('Deve rejeitar brinquedo duplicado na mesma lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA,RATO', '', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado na lista de animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', '', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve retornar uma lista vazia se nenhum animal for fornecido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'NOVELO', '');
    expect(resultado.lista).toEqual([]);
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve permitir que uma pessoa adote mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
        'LASER,RATO,BOLA', '', 'Rex,Zero,Bebe,Fofo'
    );
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Zero - pessoa 1');
    expect(resultado.lista).toContain('Bebe - pessoa 1');
    expect(resultado.lista).toContain('Fofo - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco só deve ser adotado por alguém que já tenha outro animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE', '', 'Rex,Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco não deve ser adotado se for o primeiro animal da pessoa', () => {
      const resultado = new AbrigoAnimais().encontraPessoas(
          'SKATE,RATO', '', 'Loco,Rex'
      );
      expect(resultado.lista[0]).toBe('Loco - abrigo');
      expect(resultado.lista[1]).toBe('Rex - abrigo');
      expect(resultado.erro).toBeFalsy();
  });
});
