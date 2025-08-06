const express = require('express')
const router = express.Router()
const {getProdutos, createProdutos, updateProdutos, patchProduto, deleteProdutos} = require('./../controllers/controllerProduto')

router.post('/', createProdutos)
router.get('/', getProdutos)
router.get('/:id', getProdutos)
router.put('/:id', updateProdutos)
router.patch('/:id/estoque', patchProduto)
router.delete('/:id', deleteProdutos)
module.exports = router