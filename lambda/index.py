import json
import os
import boto3 
from io import BytesIO
from PyPDF2 import PdfReader
s3 = boto3.resource('s3')
dynamodb = boto3.resource("dynamodb")

def lambda_handler(event, context):
  print(event)
  id = event.get('id')

  text = getTextFromId(id)
  print(text)
  # TODO implement
  return {
      'statusCode': 200,
      'body': json.dumps(text)
  }

def getTextFromId(id):
  filepath = getFilePathFromDynamoDb(id)
  file = getFileFromPath("public/" + filepath)
  return file

def getTextFromFile(file):
  reader = PdfReader(file)
  number_of_pages = len(reader.pages)
  text = ""
  for i in range(number_of_pages):
    page = reader.pages[i]
    text = text + page.extract_text()
  return text

def getFileFromPath(path):
  print(path)
  bucket = os.environ.get('BUCKET')
  file = read_s3_contents(bucket, path)
  reader = PdfReader(BytesIO(file))
  number_of_pages = len(reader.pages)
  text = ""
  for i in range(number_of_pages):
    page = reader.pages[i]
    text = text + page.extract_text()
  return text

def read_s3_contents(bucket_name, key):
    response = s3.Object(bucket_name, key).get()
    return response['Body'].read()

def getFilePathFromDynamoDb(id):
  table_name = os.environ.get('TABLE')
  table = dynamodb.Table(table_name)
  response = table.get_item(
    Key={
      'id': id
    }
  )
  item = response['Item']
  return item['fileKeyPath']