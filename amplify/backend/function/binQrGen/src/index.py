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
from botocore.exceptions import ClientError

s3_client = boto3.client('s3')

#s3 = boto3.cilent('s3')

# Base URI
uri = "https://dev.d250xcn72hsf21.amplifyapp.com"

def handler(event, context):
	print("Triggered via DynamoDB")
	qr = qrcode.QRCode(version=1, box_size=10, border=1)
	qr.add_data(uri) #gives the QR code the value of the website and the bin ID
	qr.make(fit = True)
	img = qr.make_image(fill = 'black', back_color = 'white')#QR image creation
	img.save("binID" + '.png')
	upload_file(img, "binqrec329227790c402dadd570286bcc7fd802931-dev", "binID.png")
	print(event)
	return json.dumps({'status_code': 200, "message": "Received from DynamoDB"})

def upload_file(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        logging.error(e)
        return False
    return True