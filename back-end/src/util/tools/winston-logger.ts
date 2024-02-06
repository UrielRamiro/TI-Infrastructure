import { createLogger, format, transports } from 'winston'

const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
)

const consoleFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    info =>
      `${info.level}` +
      `${info.message ? ' ' + info.message : ''}` +
      `${info.route !== undefined ? ' ' + info.route : ''}` +
      `${info.requestId !== undefined ? ' ' + info.requestId : ''}`
  )
)

export const winstonLogger = createLogger({
  level: 'debug',
  format: fileFormat,
  transports: [
    // new transports.File({ filename: './log/error.log', level: 'error' }),
    // new transports.File({ filename: './log/combined.log', level: 'info' })

    new transports.Console({
      format: format.combine(format.colorize(), consoleFormat)
    }),

    new transports.Console({
      format: format.prettyPrint({ colorize: true })
    })
  ]
})

// if (process.env.NODE_ENV !== 'production') {
//   winstonLogger.add(
//     new transports.Console({
//       format: format.combine(format.colorize(), consoleFormat)
//     })
//   )

//   winstonLogger.add(
//     new transports.Console({
//       format: format.prettyPrint({ colorize: true })
//     })
//   )
// }
