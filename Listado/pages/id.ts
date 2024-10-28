import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'prisma/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { nombre, descripcion, precio, stock } = req.body

    if (typeof id !== 'string') {
      res.status(400).json({ message: 'El ID proporcionado no es válido' })
      return
    }

    try {
      const productoActualizado = await prisma.producto.update({
        where: { id: parseInt(id, 10) },
        data: {
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock, 10)
        }
      })
      res.status(200).json(productoActualizado)
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el producto', error })
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
