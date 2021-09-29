# Integrate.io API Docs

## Get All unpublished posts:

[https://dev.to/api/articles/me/unpublished](https://dev.to/api/articles/me/unpublished)

- Headers:
    
    ```bash
    api-key : MiXvYZyVvqCP1oPjg2AdHhQp
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

## Post From Dev to Medium

URI : [`http://localhost:8080/api/v2/dev`](http://localhost:8080/api/v2/dev)

Body:

```json
{
    "url": "https://dev.to/angha_ramdohokar_0b6505c2/creating-restful-apis-with-mongodb-and-node-js-25ap",
    "medium": true,
    "userID": "15663e2233566a737d485e1344dc8a834862bd7aa0a17ff2debaa043cd6f0816d",
     "token":"2615790132f4a47a93d13abd55f106c94a8150d6a6a9d45d4ea9e2d67f81e2696"
}
```

`url` : URL of the The Blog from [Dev.to](http://Dev.to) which is to be cross-posted (String)

`medium` : (Boolean)

`userID` : User;s medium's USERID

`token` : User's API token