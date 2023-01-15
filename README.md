# Description 
BinQr is a React Web Application built on AWS services. This aims to let a developer create a service to generate QR codes meant to be placed on garbage/recycling bins. These QRs are linked to provided dashboard which report on the status of each bin. The QRs can then be scanned to be reported for filled bins or other issues by bystanders. 

# Getting Started
## Prerequisites
A valid AWS account is needed

You will also need the [amplify CLI](https://docs.amplify.aws/cli/).

## Installation
1. `npm install` to install all required node modules.

2. `amplify init` to initialize the project from the repo.

3. `amplify push` to push all resources to the cloud

4. `amplify publish` builds the app and pushes it to S3

5. In the Cognito service in the AWS console, create a user to login with using a valid email and password

That login will be used to access the dashboard. 

# Roadmap 
- [ ] Add a graphs of frequency each qr is scanned
- [ ] Add a displayable map of all the bin entries
- [ ] Add a bin description and more admin controls from the QR scan page
- [ ] Edit button on the dashboard entries
