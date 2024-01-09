import * as cdk from 'aws-cdk-lib';

export interface TextractionStackProps {
  stackProps: cdk.StackProps;
  dbTable: string;
  bucketName: string;
}