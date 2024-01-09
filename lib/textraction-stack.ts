import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as db from 'aws-cdk-lib/aws-dynamodb';

import { TextractionStackProps } from '../interfaces/textractions.interface';

/**
 * @class
 * TextractionStack class generates a lambda function and grants it access to the S3 bucket and DynamoDB table.
 * @comment Please provide a bucket name and a table name in the bin/textraction.ts file.
 */
export class TextractionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: TextractionStackProps) {
    super(scope, id, props.stackProps);

    const textractor = new lambda.Function(this, 'TextractionLambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromAsset('lambda'),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
      environment: {
        BUCKET: props.bucketName,
        TABLE: props.dbTable,
      },
    });

    const bucket = s3.Bucket.fromBucketName(this, 'TextractionBucket', props.bucketName);
    bucket.grantRead(textractor);

    const dbTable = db.Table.fromTableName(this, 'TextractionTable', props.dbTable);
    dbTable.grantReadData(textractor);
  }
}
