# Angular API Request Tester

A simple Angular standalone app to test API endpoints by sending a message and displaying the response in a modal.

## Features

- Enter a message and send it to a configurable API endpoint.
- Required header (`sendthis: 123Lucas`) is included in the request.
- Displays the API's `returnMessage` in a modal popup.
- Responsive and mobile-friendly UI.

## Usage

1. Enter your message in the input box.
2. Click **Send** to POST the message to the API.
3. View the response in a modal popup and click **Dismiss** to close it.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Robdetta/angular-request.git
    cd angular-request
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the application:**

    ```bash
    ng serve
    ```

    Open [http://localhost:4200](http://localhost:4200) in your browser.

## Configuration

- The API endpoint and header can be configured in the app config (see `main.ts` and `app.config.ts`).

## Tech Stack

- Angular Standalone Components
- TypeScript
- RxJS

## Development

```bash
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

---

## Running Tests

To run the unit tests, use the following command:

```bash
ng test
```

## How it Works

1.  Enter a message in the input box.
2.  Click the "Send" button to POST your message to the API endpoint.
3.  The request includes a required header: `sendthis: 123Lucas`. You can verify this in your browser's developer tools (Network tab).
4.  The API's `returnMessage` is displayed in a modal until you dismiss it.
5.  CORS may be required on the backend. If you encounter issues, ensure your API allows requests from `https://*`, `http://localhost:4200`, and `http://localhost:8100`.

## API Endpoint

The application sends requests to the following API endpoint:

`https://sample.lteprocess.com/trythis`

## Required Header

The following header is required for the API request:

`sendthis: 123Lucas`

## CORS Configuration

The backend API must be configured to allow CORS requests from the following origins:

- `https://*`
- `http://localhost:4200`
- `http://localhost:8100`
