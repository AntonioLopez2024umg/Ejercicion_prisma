import { PrismaClient } from '@prisma/client'

// Extiende el tipo global para incluir una propiedad 'prisma' en el objeto global de Node.js
declare global {
  // Esto evita errores de declaración múltiple en desarrollo
  // y asegura que la propiedad 'prisma' solo se declare una vez
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient
    }
  }
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // En desarrollo, utiliza una instancia global para evitar la creación de múltiples instancias
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
