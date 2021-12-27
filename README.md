<p align="center">
  <img src="https://user-images.githubusercontent.com/72073401/136081559-35426b5c-6579-40ed-ac99-f064cfc47abd.png" alt="integrate.io logo"/>
</p>

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

## Post From Medium to Dev or Hashnode

URI: [`http://localhost:8080/api/v2/medium`](http://localhost:8080/api/v2/medium)

Body:

```json
{
    "url": "https://medium.com/@amanshri.nitrr/a-job-switch-plan-that-actually-works-e09701c26d88",
    "dev_api": "ShVKKiC9AZ1tb",
    "dev": true,
    "hash": true,
    "hash_api": "fee010ff-bde30bb9"
}
```

- `url` : URL of the The Blog from Medium which is to be cross-posted (String)
- `dev` : (Boolean)
- `hash` : (Boolean)
- `dev_api` : User's dev.to API token
- `hash_api` : User's Hashnode API Token

## Swagger API documentation

Access the api documentation using [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Donating
  
  
Help Us Pay off Our Domain and Hosting Charges<br>


<a href="https://www.buymeacoffee.com/integrateme">
<img width="208" alt="snapshot-bmc-button" src="https://user-images.githubusercontent.com/72073401/140631132-f03daad8-c1e8-45ed-970b-94f204d5bba4.png">
</a>
