import { createLogger, format, transports } from 'winston'

export const requestLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [new transports.File({ filename: './log/requests.log' })]
})
