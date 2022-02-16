import { Construct } from 'constructs'
import { Stack, StackProps, aws_lambda, aws_apigateway } from 'aws-cdk-lib'

export class IacStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const fn = new aws_lambda.Function(this, 'fn', {
      code: aws_lambda.Code.fromAsset('../server/dist'),
      handler: 'index.handler',
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
    })
    const api = new aws_apigateway.RestApi(this, 'api', {
      defaultCorsPreflightOptions: {
        allowOrigins: aws_apigateway.Cors.ALL_ORIGINS,
        allowMethods: aws_apigateway.Cors.ALL_METHODS,
        allowHeaders: aws_apigateway.Cors.DEFAULT_HEADERS,
      },
    })
    api.root
      .addResource('{proxy+}')
      .addMethod('ANY', new aws_apigateway.LambdaIntegration(fn))
  }
}
