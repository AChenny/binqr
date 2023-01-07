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

def handler(event, context):
	print(f"This is the table event: {event['Records'][0]['eventName']}")

	id = event['Records'][0]['dynamodb']['Keys']['id']['S']
	fileName = id + '.png'
	key = "public/" + fileName

	if event['Records'][0]['eventName'] == "INSERT":
		print("Generatoring QRCode...")
		qr = qrcode.QRCode(version=1, box_size=10, border=1)
		qrData = uri + "/qrscan?id=" + id
		qr.add_data(qrData) #gives the QR code the value of the website and the bin ID
		print(f"The QRCode data is URL={qrData}.")
		qr.make(fit = True)
		img = qr.make_image(fill = 'black', back_color = 'white')#QR image creation
		in_mem_file = io.BytesIO()
		img.save(in_mem_file, format=img.format)
		in_mem_file.seek(0)

		s3_client.upload_fileobj(in_mem_file, os.environ['STORAGE_S395F81F89_BUCKETNAME'], key)
		fileURL = '%s/%s/%s' % (s3_client.meta.endpoint_url, os.environ['STORAGE_S395F81F89_BUCKETNAME'], key)
		print(f"Upload the file:{key} at the bucket:{os.environ['STORAGE_S395F81F89_BUCKETNAME']}.")

		table.update_item(
		    Key={'id': id},
		    UpdateExpression="SET s3link = :updated",                   
            ExpressionAttributeValues={':updated': fileURL}
		)
	
	elif event['Records'][0]['eventName'] == "REMOVE":
		s3_client.delete_object(
			Key= key,
			Bucket= os.environ['STORAGE_S395F81F89_BUCKETNAME']
		)

		print(f"The table {os.environ['API_BINQR_QRENTRYTABLE_NAME']} has Remove item {id} and has remove file {key} from the bucket {os.environ['STORAGE_S395F81F89_BUCKETNAME']}.")

	elif event['Records'][0]['eventName'] == "MODIFY":
		if event['Records'][0]['dynamodb']['NewImage']['full']['BOOL'] == True:
			print(f"The table {os.environ['API_BINQR_QRENTRYTABLE_NAME']} has MODIFY item {id} has updated the field full={event['Records'][0]['dynamodb']['NewImage']['full']['BOOL']}.")

		else:
			print(f"The table {os.environ['API_BINQR_QRENTRYTABLE_NAME']} has MODIFY item {id} has updated the field s3link={event['Records'][0]['dynamodb']['NewImage']['s3link']['S']}.")
		
	return json.dumps({'status_code': 200, "message": "Received from DynamoDB"})