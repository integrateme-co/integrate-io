# Integrate.io API Docs

## Get All unpublished posts:

[https://dev.to/api/articles/me/unpublished](https://dev.to/api/articles/me/unpublished)

- Headers:

    ```bash
    api-key : MiXvYuiwhjk9322AhQp
    ```

## Schedule a post:

[http://localhost:8080/api/v2/schedule](http://localhost:8080/api/v2/schedule)

- Body:

    ```bash
    {
        "articleID": "383924",
        "APIkey": "YOUR_API_KEY",
        "publishTime": "2021-09-23T20:50:41.751Z"
    }
    ```

## Cron Jobs

Run the `services/cronJobs.js` file

```bash
node cronJobs.js
```
