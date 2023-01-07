''' Amplify Params - DO NOT EDIT
	API_BINQR_GRAPHQLAPIENDPOINTOUTPUT
	API_BINQR_GRAPHQLAPIIDOUTPUT
	API_BINQR_GRAPHQLAPIKEYOUTPUT
	API_BINQR_QRENTRYTABLE_ARN
	API_BINQR_QRENTRYTABLE_NAME
	ENV
	REGION
	STORAGE_S395F81F89_BUCKETNAME
Amplify Params - DO NOT EDIT '''

import qrcode
import boto3
import json
import logging
import os
import io

s3_client = boto3.client('s3')
table = boto3.resource('dynamodb').Table(os.environ['API_BINQR_QRENTRYTABLE_NAME'])

# Base URI
uri = "https://dev.d250xcn72hsf21.amplifyapp.com"
bucket_name = "binqrec329227790c402dadd570286bcc7fd802931-dev"

def handler(event, context):
	if event['Records'][0]['eventName'] == "INSERT":
		id = event['Records'][0]['dynamodb']['Keys']['id']['S']
		qr = qrcode.QRCode(version=1, box_size=10, border=1)
		qr.add_data(uri + "/qrscan?id=" + id) #gives the QR code the value of the website and the bin ID
		qr.make(fit = True)
		img = qr.make_image(fill = 'black', back_color = 'white')#QR image creation
		in_mem_file = io.BytesIO()
		img.save(in_mem_file, format=img.format)
		in_mem_file.seek(0)
		fileName = id + '.png'
		s3_client.upload_fileobj(in_mem_file, os.environ['STORAGE_S395F81F89_BUCKETNAME'], "public/" + fileName)

		fileURL = '%s/%s/%s' % (s3_client.meta.endpoint_url, os.environ['STORAGE_S395F81F89_BUCKETNAME'], fileName)
		
		table.update_item(
		    Key={'id': id},
		    UpdateExpression="SET s3link = :updated",                   
            ExpressionAttributeValues={':updated': fileURL}
		)
		
	return json.dumps({'status_code': 200, "message": "Received from DynamoDB"})