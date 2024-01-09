# Welcome to your CDK TypeScript project
Project that uses AWS-cdk to create a lambda function that you call with an id of a pdf, looks it up in  dynamodb, gets the pdf from s3 and returns the text content;

## Setup
Add region, bucketname and dynamodb table name to ./bin/textraction.ts file
run cdk synth and the cdk deploy to build project in aws

## Requirements
- Innstalled cdk cli
- Access to an aws accountn and configured AWS environment variables (Short-term credentials) for the cli
- change ./lambda/index.py to mactch your requirements and setup

## Function
uses Py2PDF library to extract file content.

This function is ment to be called with an id, and returns filecontents of a pdf file

## Todo
- error messages
- return error if file is not pdf
