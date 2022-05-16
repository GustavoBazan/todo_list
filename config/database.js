//importar o mongoose
const mongoose = require('mongoose')

//script de conexão
const conn = async()=>{
    const atlas = await mongoose.connect('mongodb+srv://userLR:qHDFiCH21BRspyzU@fiaptecnico.wdjtf.mongodb.net/dblr')
}

//exportar as informações para acesso externo
module.exports = conn