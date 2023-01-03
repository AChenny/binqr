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

import json

def handler(event, context):
    print("Triggered via DynamoDB")
    print(event)
    return json.dumps({'status_code': 200, "message": "Received from DynamoDB"})
