# Email Spike - Mailpit (Via Docker Compose) and Nest JS Http Api

This is how the app essentially works

```merdmaid
flowchart TD;
  Controller-->EmailerService;
  EmailSerivce-->NodeClient;
  NodeClient-->Then sends email;
```

## Instructions

- Run the following command
  ```bash
    docker compose up -d
  ```
- Next, run
  ```bash
    npm i
  ```
- Then run
  ```bash
    npm run start
  ```

## Purpose

This is essentially a spike for a personal project on Gitlab that needs email functionality and I thought this would be useful to open source and would show some of the skills used in the project without exposing the code directly.


## Note

- Yes the .env is left in there on purpose (it doesn't include any third party secrets and is a spike, so it's not a big deal)
