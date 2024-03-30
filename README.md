# Web App with Firebase Data and Dynamic Table Filter Component

## Overview
This web application is designed to display data retrieved from Firebase in a tabular format. It includes a dynamic table filter component that allows users to filter the table contents based on specific conditions. The filter component generates filter queries in a predefined format and applies them to the table.

## Features
- Display data from Firebase in a table format.
- Dynamic table filter component to filter data based on user-defined conditions.
- Add any number of filter conditions with logical AND/OR operations.
- Support for various data types including string, number, and boolean.
- Intuitive user interface with user-friendly dropdowns and text inputs.

## Components
### 1. Table Component
- Columns:
  - Name
  - Screen Name
  - Followers Count
  - Following Count
  - Location
  - Verified
- Data is retrieved from Firebase and displayed in the table.

### 2. Filter Component
- Allows users to add multiple filter conditions.
- Each filter condition consists of:
  - Column Name (Dropdown)
  - Operator (Dropdown)
  - Value (Text input / Dropdown for boolean)
- Supports logical AND/OR operations between filter conditions.



## Sample Output


https://github.com/dev04sa/Table_data-Web-app/assets/129666293/55c98817-f3a0-439f-938b-5380f529311c



## How to Run
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm start`.
4. Access the web app through the provided URL.

## Technologies Used
- Next.js
- Firebase




## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
Special thanks to Firebase for providing the database service, and to React.js community for the frontend framework.
