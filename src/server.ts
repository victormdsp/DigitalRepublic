const express = require("express");
const router = require("./routes");
const mongoose = require("mongoose")
const cors = require('cors');

mongoose.connect("mongodb+srv://digitalrepublic:teste123teste@cluster0.zm0nvyf.mongodb.net/DigitalRepublic2");

export const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(3001, () => {
    console.log(" Escutando na porta 3000\n")
    console.log(" Olá avaliador da Digital Republic =), este projeto é o princial. \n Neste projeto utilizei apenas um Modelo para a Conta com seus respectivos atributos.\n")
    console.log(" Para rodar os teste é necessário ter o node maior que 14 e utilizar o npm run test.\n")
    console.log(" Estou deixando casos de teste para cada rota caso queira testar no postman ou insomnia: \n");
    console.log(" Utilizando o método POST nós temos: \n")
    console.log(" Criar uma conta: \n {\n    'cpf': '1233355',\n    'password': '12345678',\n    'name': 'Teste',\n    'midName': 'tt',\n    'lastName': '' \n}\n")
    console.log(" ------------------------------------\n")
    console.log(" Utilizando o método GET nós temos: \n")
    console.log(" getConta: \n {\n    'cpf': '1233355'\n }\n")
    console.log(" getSaldo: \n {\n    'cpf': '1233355'\n }\n")
    console.log(" ------------------------------------\n")
    console.log(" Utilizando o método PUT nós temos: \n")
    console.log(" Transferencia: \n {\n    'cpfTransferidor': 123335,\n    'cpfTransferido': 1233355,\n    'valor': 20,\n    'password': '12345678'\n} \n")
    console.log(" Deposito: \n {\n    'cpf': '12333',\n    'valor': 400\n }\n")
    console.log(" OBS: ----- Caso queira falhar algum teste é só trocar o CPF, ou colocar um valor negativo ou igual a 0 -----\n");
    console.log("       Muito obrigado pela oportunidade e chance !! =) \n");
    console.log("                       Att: Victor Martini");
});