## About
#### Delivers account orders automatically using `active_device_token` and `refresh_token` cookies.
## Cookies
#### `G2GSESID_V4` - Random text.
#### `refresh_token` - Random text with a dot
#### `active_device_token` - Random text
## Installation
#### Install `Node.js` if you haven't already.
#### Download the `G2G-Account-Auto-Deliver` repository.
#### Open terminal in the folder you see `package.json`.
#### Install dependencies by running `npm install`.
#### Build the javascript bundle by running `npm run build`.
#### Launch the app by running `npm start`.
#### Enter your cookies in to the generated `Settings.json` file.
#### Enter your accounts in to the generated `Accounts.json` file.
#### Launch the app again and you are done.

## Settings
#### Enter your `refresh_token` and `active_device_token` cookies into `Settings.json` file which will be generated when you first run the app, entering `G2GSESID_V4` is not necessary.
#### Access the cookie by going to www.g2g.com then pressing CTRL + SHIFT + I -> Application -> Cookies -> https://www.g2g.com
#### The `Accounts.json` file will be generated when the application is run for the first time.
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
