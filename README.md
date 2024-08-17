# User Password Update Frontend
A frontend app for [Identity Provider Synchronization Service](https://github.com/ExtKernel/idp-sync-service.git) to change and synchronize user passwords. This exists because the [service](https://github.com/ExtKernel/idp-sync-service.git) can't retrieve user passwords from all clients (as of 17.08.2024, it can't retrieve passwords from any of them), so the only control over passwords is resetting them to a given value. This app provides a frontend for users to set and synchronize their passwords across all clients.

## Usage
1) Clone the repository:
    ```bash
      git clone https://github.com/ExtKernel/user-password-update-frontend.git
    ```
2) Navigate to the directory:
    ```bash
      cd user-password-update-frontend
    ```
3) Create an `.env` file in the project directory:
    ```bash
      touch .env
    ```
4) Set following environment variables in the file:
    ```
       REACT_APP_SYNC_SERVICE_CLIENT_ID=<idp-sync-service-oauth2-client-id>
       REACT_APP_SYNC_SERVICE_CLIENT_SECRET=<idp-sync-service-oauth2-client-secret>
       REACT_APP_OAUTH2_PROVIDER_TOKEN_URL=<idp-sync-service-oauth2-provider-token-url>
       REACT_APP_SYNC_SERVICE_USER_API_URL=<idp-sync-service-user-endpoint-full-url>
    ```
    Explanation:
    - REACT_APP_SYNC_SERVICE_CLIENT_ID - the `client ID` that the [service](https://github.com/ExtKernel/idp-sync-service.git) has in its OAuth2 provider
    - REACT_APP_SYNC_SERVICE_CLIENT_SECRET - the `client secret` that the [service](https://github.com/ExtKernel/idp-sync-service.git) has in its OAuth2 provider
    - REACT_APP_OAUTH2_PROVIDER_TOKEN_URL - the `token endpoint` full URL of the OAuth2 provider that the [service](https://github.com/ExtKernel/idp-sync-service.git) is registered in
    - REACT_APP_SYNC_SERVICE_USER_API_URL - the `user` endpoint full URL of the [service](https://github.com/ExtKernel/idp-sync-service.git)
5) Run the app:
    ```bash
      npm start
    ```
