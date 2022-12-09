import { Router, Request } from "express";
import { modelConta } from './mongoDBModels/ContaSchema';
import { v4 } from "uuid";

const bycrypt = require("bcryptjs");

const router = Router();

//Rota para buscar uma Conta;
router.post('/getConta', async (req, res) => {
    console.log(req.body);
    const data = req.body;
    const contaDb = await modelConta.find({ cpf: data.cpf })
    if (!contaDb[0]) res.status(404).send({message:"Nenhuma conta registrada neste cpf"});
    else {
        res.status(200).send(contaDb[0]);
    }
})

//Rota para buscar o saldo de uma Conta;
router.get('/getSaldo', async (req, res) => {
    const data = req.body;
    const contaDb = await modelConta.find({ cpf: data.cpf });
    if (!contaDb[0]) res.status(404).send({message:"Nenhuma conta registrada neste cpf"});
    else {
        res.status(200).send(contaDb[0].saldo);
    }
})

//Rota para criar uma Conta;
router.post('/criarConta', async (req, res) => {
    const data = req.body;

    const contaDB = await modelConta.find({ cpf: data.cpf })
    if (contaDB[0]) res.status(400).send({message:"Conta já criada"});

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
                res.status(200).send(conta);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    }

});

//Rota para realizar uma transferência
router.put('/transferencia', async (req, res) => {
    const data = req.body;

    const contaTransferidorDb = await modelConta.find({ cpf: data.cpfTransferidor });
    const contaTransferidaDb = await modelConta.find({ cpf: data.cpfTransferido });

    //Verificações se todos os valores estão em ordem;
    if (!contaTransferidorDb[0]) res.status(400).send({message:"Nenhuma conta registrada neste cpf."});
    else if (!contaTransferidaDb[0]) res.status(400).send({message:"A conta que você esta tentando transferir não existe."});
    else if (!bycrypt.compareSync(data.password, contaTransferidorDb[0].password)) res.status(400).send({message: "Senha da conta incorreta."}); //Verifica se a senha da conta está correta

    else {

        const contaTransferidor = contaTransferidorDb[0];
        const contaTransferida = contaTransferidaDb[0];

        //Realizando a transferência e removendo o valor do saldo
        contaTransferidor.saldo -= data.valor;
        const transferenciaFeita = await modelConta.findOneAndUpdate({ cpf: contaTransferidor.cpf }, { saldo: contaTransferidor.saldo });

        //Adicionando valor ao saldo;
        contaTransferida.saldo += parseInt(data.valor);
        const transferenciaRecebida = await modelConta.findOneAndUpdate({ cpf: contaTransferida.cpf }, { saldo: contaTransferida.saldo });

        if (transferenciaFeita && transferenciaRecebida) res.status(200).send({saldo: contaTransferidor.saldo});
        else res.status(500).send({message: "Houve um problema na transferência , tente novamente mais tarde"});
    }
})

//Rota para realizar um depósito;
router.put('/depositar', async (req, res) => {
    const data = req.body;
    const contaDb = await modelConta.find({ cpf: data.cpf });

    if (!contaDb[0]) res.status(404).send({message:"Conta não encontrada"});
    else {
        const conta = contaDb[0];
        conta.saldo += data.valor;
        modelConta.findOneAndUpdate({ id: conta.id }, { saldo: conta.saldo })
            .then(() => {
                res.status(200).send(data.valor);
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }
});

//Rota para se logar em uma Conta;
router.post('/login', async (req, res, next) => {
    const data = req.body;
    const contaDb = await modelConta.find({ cpf: data.cpf })
    
    if (!contaDb[0]) return res.status(404).send({message: "Não foi possível encontrar o usuário"});
    else if(!bycrypt.compareSync(data.password, contaDb[0].password)) res.status(400).send({message: "Senha da conta incorreta."});
    else {
        res.status(200).send(contaDb[0]);
    }
})

module.exports = router;