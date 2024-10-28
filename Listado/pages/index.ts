import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { codigo, nombre, descripcion, precio, stock } = req.body

    // Validar que los campos requeridos estén presentes y sean del tipo correcto
    if (
      !codigo ||
      !nombre ||
      precio === undefined ||
      stock === undefined ||
      isNaN(parseFloat(precio)) ||
      isNaN(parseInt(stock, 10))
    ) {
      res.status(400).json({ message: 'Datos inválidos o incompletos' })
      return
    }

    try {
      const nuevoProducto = await prisma.producto.create({
        data: {
          codigo,
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock, 10)
        }
      })
      res.status(201).json(nuevoProducto)
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el producto', error })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
