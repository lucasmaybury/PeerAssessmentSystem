java -jar ../modules/swagger-codegen-cli.jar generate -i ../api/swaggerDocs.json -l nodejs-server -o ./api-client
java -jar ../modules/swagger-codegen-cli.jar generate -i ../database/swaggerDocs.json -l nodejs-server -o ./database-client