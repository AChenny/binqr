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
import io
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')

# s3 = boto3.cilent('s3')

# Base URI
uri = "https://dev.d250xcn72hsf21.amplifyapp.com"
bucket_name = "binqrec329227790c402dadd570286bcc7fd802931-dev"

def handler(event, context):
	print("Triggered via DynamoDB")
	qr = qrcode.QRCode(version=1, box_size=10, border=1)
	qr.add_data(uri) #gives the QR code the value of the website and the bin ID
	qr.make(fit = True)
	img = qr.make_image(fill = 'black', back_color = 'white')#QR image creation
	in_mem_file = io.BytesIO()
	img.save(in_mem_file, format=img.format)
	in_mem_file.seek(0)
	s3_client.upload_fileobj(in_mem_file, bucket_name, 'binID.png')
	print(event)
	return json.dumps({'status_code': 200, "message": "Received from DynamoDB"})