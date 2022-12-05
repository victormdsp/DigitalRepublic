import { Router, Request, Response } from "express";
import { modelConta } from './mongoDBModels/ContaSchema';
import { v4 } from "uuid";

const bycrypt = require("bcryptjs");

const router = Router();

//Rota para buscar uma Conta;
router.get('/getConta', async (request, response) => {
    const data = request.body;
    const contaDb = await modelConta.find({ cpf: data.cpf })
    if (!contaDb[0]) response.status(404).send("Conta não encontrada");
    else {
        response.status(200).send(contaDb[0]);
    }
})

//Rota para buscar o saldo de uma Conta;
router.get('/getSaldo', async (request, response) => {
    const data = request.body;
    const contaDb = await modelConta.find({ cpf: data.cpf });
    if (!contaDb[0]) response.status(404).send("Conta não encontrada");
    else {
        response.status(200).send(`O saldo desta conta é de R$${contaDb[0].saldo}`);
    }
})

//Rota para criar uma Conta;
router.post('/criarConta', async (request, response, next) => {
    const data = request.body;

    const contaDB = await modelConta.find({ cpf: data.cpf })
    if (contaDB[0]) response.status(400).send("Conta já criada");

    else {
        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(data.password, salt);
        const conta = {
            id: v4(),
            saldo: 0,
            cpf: data.cpf,
            password: hashPassword,
            name: data.name,
            midName: data.midName,
            lastName: data.lastName
        }

        modelConta.create(conta)
            .then(() => {
                response.status(200).send(conta);
            })
            .catch(err => {
                response.status(200).send(err.message);
            });
    }

});



//Rota para realizar uma transferência
router.put('/transferencia', async (request, response) => {
    const data = request.body;

    const contaTransferidorDb = await modelConta.find({ cpf: data.cpfTransferidor });
    const contaTransferidaDb = await modelConta.find({ cpf: data.cpfTransferido });

    //Verificações se todos os valores estão em ordem;
    if (!data.valor || data.valor <= 0) response.status(400).send("Valor de transferência incorreto.");
    else if (!contaTransferidorDb[0]) response.status(400).send("Conta do transferidor não encontrada.");
    else if (!contaTransferidaDb[0]) response.status(400).send("Conta a ser transferida não encontrada.");
    else if (!bycrypt.compareSync(data.password, contaTransferidorDb[0].password)) response.status(400).send("Senha da conta incorreta."); //Verifica se a senha da conta está correta

    //Verificação do saldo da conta que está transferindo;
    if (data.valor > contaTransferidorDb[0].saldo) {
        response.status(400).send("Saldo indisponível.");
    }
    else {

        const contaTransferidor = contaTransferidorDb[0];
        const contaTransferida = contaTransferidaDb[0];

        //Realizando a transferência e removendo o valor do saldo
        contaTransferidor.saldo -= data.valor;
        const transferenciaFeita = await modelConta.findOneAndUpdate({ id: contaTransferidor.id }, { saldo: contaTransferidor.saldo })

        //Adicionando valor ao saldo;
        contaTransferida.saldo += data.valor;
        const transferenciaRecebida = await modelConta.findOneAndUpdate({ cpf: contaTransferida.cpf }, { saldo: contaTransferida.saldo })

        if (transferenciaFeita && transferenciaRecebida) response.status(200).send(`Transferência realizada com sucesso, seu saldo atual é de R$${contaTransferidor.saldo}.`);
        else response.status(500).send("Houve um problema na transferência , tente novamente mais tarde");
    }
})

//Rota para realizar um depósito;
router.put('/depositar', async (request, response) => {
    const data = request.body;
    const contaDb = await modelConta.find({ cpf: data.cpf });

    if (!data.valor || data.valor <= 0 || data.valor > 2000) response.status(400).send("Valor de deposito incorreto.");
    else if (!contaDb[0]) response.status(404).send("Conta não encontrada");
    else {
        const conta = contaDb[0];
        conta.saldo += data.valor;
        modelConta.findOneAndUpdate({ id: conta.id }, { saldo: conta.saldo })
            .then(() => {
                response.status(200).send(`Depósito de R$${data.valor} efetuado.`);
            })
            .catch(err => {
                response.status(400).send(err.message);
            });
    }
});

module.exports = router;