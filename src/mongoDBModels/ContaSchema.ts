import { Schema, model } from 'mongoose';

const Conta = new Schema({
    // Id totalmente opcional , o mongoDb já cria um Id mas eu criei um para exemplificar caso seja outro banco que não haja criação automática.
    id: {
        type: String,
        required: true,
    },
    saldo: {
        type: Number,
        default: 0,
    },
    cpf: {
        type: Number,
        required: true,
        minLength: 4,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    name: {
        type: String,
        required: true
    },

    midName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: false
    },
})

export const modelConta = model('Conta', Conta); 