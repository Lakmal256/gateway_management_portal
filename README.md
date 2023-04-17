# Web-based Gateway Management Solution
This is a web-based solution to manage Gateways and attached peripheral devices of Tech Venturas. The solution is built using JavaScript programming language and ReactJS framework. The solution includes a Docker build solution which can be up and running on local or cloud services with a few more steps. This document contains the instructions on how to use the solution.

## Features
The solution offers the following features:

Display information about all stored gateways
Add, edit, delete both Gateways and Devices
Validation of fields marked as "to be validated"
No more than 10 peripheral devices are allowed for a gateway
Pagination is not available with given APIs.

## Requirements
To run the solution, the following requirements should be met:

Docker installed on your machine
Internet connection

## Installation
Follow these steps to run the solution:

Clone the project from the Git repository:
```bash
`git clone https://github.com/Lakmal256/gateway_management_portal.git`
```

Navigate to the project directory:
```bash
`cd project-directory`
```
Access the solution in your browser at http://localhost:3000

## UI Wireframes
The wireframes for the UI design are available in a separate Google document. The UI is designed using Figma, which is a popular UI design tool.

## Assumptions
The provided REST API has been tested and is functioning correctly
The solution is designed to work with modern web browsers such as Chrome, Firefox, and Edge
The solution has been developed to be scalable and maintainable
The solution does not support pagination for gateway information
The solution supports a maximum of 10 peripheral devices for a gateway
The IPv4 address of each gateway must be validated

## Tests
Basic unit/component/integration tests are included in the solution. To run the tests, use the following command:
```bash
npm test
```

## Conclusion
This solution provides a web-based gateway management solution for Tech Venturas. It is built using JavaScript programming language and ReactJS framework. The solution includes a Docker build solution which can be up and running on local or cloud services with a few more steps.