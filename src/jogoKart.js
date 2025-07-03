const player1 = {
nome: "Mario",
poder: 3,
manobrabilidade: 4,
velocidade: 5,
pontos: 0
}

const player2 = {
nome: "Luigi",
poder: 4,
manobrabilidade: 5,
velocidade: 3,
pontos: 0
}

//Rolagem dos dados
async function dados(){
return Math.floor(Math.random() * 6 + 1)
}

//Sorteio da pista
async function pistaAleatorio(){
let randon = Math.random()
let result

switch(true){
    case randon < 0.33:
    result = "RETA"
    break;
    case randon < 0.66:
    result = "CURVA"
    break;
    default:
    result = "CONFRONTO"
}
return result


}

//Resultado
async function logResultado(chararcterName, pista, dadoResultado, atributo) {
console.log(`${chararcterName} 🎲 rolou um dado de ${pista} ${dadoResultado} + ${atributo} = ${dadoResultado + atributo}`)

}

async function inicioCorrida(Character1, Character2) {
for(let round = 1; round <= 5; round++ ){
console.log(`🏁Rodada ${round}`);

    let pista = await pistaAleatorio()
    console.log(`Pista: ${pista}`)

    let resultDado1 = await dados();
    let resultDado2 = await dados();

    let testeSkill1 = 0
    let testeSkill2 = 0

    if (pista == "RETA"){
        testeSkill1 = resultDado1 + Character1.velocidade;
        testeSkill2 = resultDado2 + Character2.velocidade;

        await logResultado(Character1.nome, "velocidade", resultDado1, Character1.velocidade)
        await logResultado(Character2.nome, "velocidade", resultDado2, Character2.velocidade)
    }
    if (pista == "CURVA"){
        testeSkill1 = resultDado1 + Character1.manobrabilidade
        testeSkill2 = resultDado2 + Character2.manobrabilidade

        await logResultado(Character1.nome, "Curva", resultDado1, Character1.manobrabilidade)
        await logResultado(Character2.nome, "Curva", resultDado2, Character2.manobrabilidade)
    }
    if (pista == "CONFRONTO"){
        let powerResult1 = resultDado1 + Character1.poder
        let powerResult2 = resultDado2 + Character2.poder

        console.log(`Os jogadores ${player1.nome} e ${player2.nome} entraram em confronto!🥊` )

        await logResultado(Character1.nome, "Confronto", resultDado1, Character1.poder)
        await logResultado(Character2.nome, "Confronto", resultDado2, Character2.poder)

        if (powerResult1 > powerResult2){
            console.log(`${player1.nome} ganhou o confronto! ${player2.nome} perde um ponto!🐢`)
            if (Character2.pontos > 0) {
                Character2.pontos--
            }
        }
        if (powerResult2 > powerResult1){
            console.log(`${player2.nome} ganhou o confronto! ${player1.nome} perde um ponto!🐢`)
            if (Character1.pontos > 0) {
                Character1.pontos--
            }
        }
        if (powerResult1 === powerResult2){
            console.log("Empate no confronto!")
        }
    }

    if(testeSkill1 > testeSkill2){
        console.log(`${Character1.nome} marcou um ponto!`);
        Character1.pontos++;
    } else if(testeSkill2 > testeSkill1){
        console.log(`${Character2.nome} marcou um ponto!`);
        Character2.pontos++;
    } else {
        console.log("Empate de habilidade!");
    }

    console.log('-------------------------------------------------')
}

}

async function vencedor(Character1, Character2) {
console.log(`${Character1.nome}: ${Character1.pontos}`)
console.log(`${Character2.nome}: ${Character2.pontos}`)

if(Character1.pontos > Character2.pontos){
    console.log(`${Character1.nome} venceu a corrida!!🏆.`)
} else if (Character2.pontos > Character1.pontos){
    console.log(`${Character2.nome} venceu a corrida!!🏆.`)
} else{
    console.log("A corrida terminou em empate")
}

}

(async function main() {
console.log(`🏁🚨Corrida entre ${player1.nome} e ${player2.nome} começando...`)

await inicioCorrida(player1,player2)
await vencedor(player1, player2)
})();