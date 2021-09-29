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

## Post From Dev to Medium or Hashnode

URI : [`http://localhost:8080/api/v2/dev`](http://localhost:8080/api/v2/dev)

Body:

```json
{
    "url": "https://dev.to/uzairali10/load-balancer-101-4jl9",
    "medium": true,
    "hash": true,
    "medium_userID": "15663e223356baa043cd6f0816d",
     "medium_token":"2615790132f4a47a93d13abd55f96",
     "hash_token": "fee010ff-bd64-496a-d28a58e30bb9"
}
```

- `url` : URL of the The Blog from [Dev.to](http://Dev.to) which is to be cross-posted (String)
- `medium` : (Boolean)
- `medium_userID` : User's medium's user ID can be fetched from ([https://api.medium.com/v1/me](https://api.medium.com/v1/me))
- `medium_token` : User's medium's API token
- `hash_token` : User's Hashnode API Token