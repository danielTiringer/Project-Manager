import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';

export function generateClient(app: INestApplication) {
  const documentBuilder = new DocumentBuilder().setTitle('Project-Manager');

  return OpenApiNestFactory.configure(app, documentBuilder, {
    fileGeneratorOptions: {
      enabled: true,
      outputFilePath: './project-manager-api-spec.yaml',
    },
    webServerOptions: {
      enabled: true,
      path: 'api/api-docs',
    },
    clientGeneratorOptions: {
      enabled: true,
      type: 'typescript-axios',
      outputFolderPath: '../user-client/src',
      additionalProperties: [
        'apiModulePrefix=ProjectManager',
        'configurationPrefix=ProjectManagerModule',
        'file-naming=kebab-case',
        'modelFileSuffix=.model',
        'enumNameSuffix=""',
        'withoutPrefixEnums=true',
        'withSeparateModelsAndApi=true',
        'stringEnums=true',
      ].join(','),
      openApiFilePath: '/project-manager-api-spec.yaml',
    },
  });
}
