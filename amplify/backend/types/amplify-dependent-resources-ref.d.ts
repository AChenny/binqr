export type AmplifyDependentResourcesAttributes = {
<<<<<<< HEAD
  "api": {
    "binqr": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
=======
    "api": {
        "binqr": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "binqr0c8b1dc9": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "s395f81f89": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "binQrGen": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "LambdaExecutionRoleArn": "string"
        }
    },
    "geo": {
        "map08f4aa31": {
            "Name": "string",
            "Style": "string",
            "Region": "string",
            "Arn": "string"
        }
>>>>>>> 1d2c050 (pull backend)
    }
  },
  "auth": {
    "binqr0c8b1dc9": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "CreatedSNSRole": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "binQrGen": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "geo": {
    "map08f4aa31": {
      "Arn": "string",
      "Name": "string",
      "Region": "string",
      "Style": "string"
    }
  },
  "storage": {
    "s395f81f89": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}