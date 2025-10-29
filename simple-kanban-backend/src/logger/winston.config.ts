import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';

export const winstonConfig = {
  //  we can setup multipel transport layers. for ex: to file, to elastisearch etc based on need
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.colorize(),
        nestWinstonModuleUtilities.format.nestLike('KanbanApp', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),

    // Optional: write logs to file
    new transports.File({
      filename: 'logs/app.log',
      format: format.combine(format.timestamp(), format.json()),
      level: 'info',
    }),

    // Optional: separate error logs
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
};
