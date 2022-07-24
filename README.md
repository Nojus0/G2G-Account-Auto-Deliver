## About
#### Delivers account orders automatically using G2GSESID_V4 session cookie.
## Cookies
#### `G2GSESID_V4` - Random text.
## Installation
#### Download the `G2G-Account-Auto-Deliver` repository.
#### Open terminal in the folder you see `package.json`.
#### Install dependencies by running `npm install`.
#### Build the javascript bundle by running `npm run build`.
#### Launch the app by running `npm start`
## Settings
#### Enter your G2GSESID_V4 cookie into Settings.json file which will be generated when you first run the app.
#### Access the cookie by going to www.g2g.com then pressing CTRL + SHIFT + I -> Application -> Cookies -> https://www.g2g.com -> G2GSESID_V4 -> Value
## Accounts
```
[
  {
    "target_title": "The title of the listing this account is meant to deliver.",
    "account_id": "username",
    "password": "password",
    "first_name": "name",
    "last_name": "last",
    "account_country": "Country",
    "date_of_birth": "0000-00-00",
    "email_account": "email",
    "email_password": "email_pass",
    "secret_question": "None",
    "secret_answer": "None",
    "additional_note": "note"
  },
  {
  ... Another account
  }
]
```
