#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TextractionStack } from '../lib/textraction-stack';

const app = new cdk.App();

/** 
 * Enter your bucket name and table name here.
 * If you want to use the default region, remove the region property from the env object.
 * If you want to use a different region, change the region property to your desired region.
 * If you want to use a different account, change the account property to your desired account.
 */
new TextractionStack(app, 'TextractionStack', {
  stackProps: {
    env: { 
      account: process.env.CDK_DEFAULT_ACCOUNT, 
      region: 'ENTER YOUR REGION HERE OR CHANGE TO DEFAULT REGION',
    },
  },
  bucketName: "ENTER YOUR BUCKET NAME HERE",
  dbTable: "ENTER YOUR TABLE NAME HERE",
});