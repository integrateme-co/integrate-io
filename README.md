<p align="center">
  <img src="https://user-images.githubusercontent.com/72073401/136081559-35426b5c-6579-40ed-ac99-f064cfc47abd.png" alt="integrate.io logo"/>
</p>

# Backend Architecture

![Cross-Post Architechure](https://user-images.githubusercontent.com/72073401/139555093-bdfb353d-aa12-46bb-9a8e-e4b73bc4da57.jpg)

# integrateme.co API Docs

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
    "hash_userID":"63afb169f8ef1447b8c0cfe2",
     "medium_token":"2615790132f4a47a93d13abd55f96",
     "hash_token": "fee010ff-bd64-496a-d28a58e30bb9"
}
```

- `url` : URL of the The Blog from [Dev.to](http://Dev.to) which is to be cross-posted (String)
- `medium` : (Boolean)
- `medium_token` : User's medium's API token
- `hash_token` : User's Hashnode API Token
- `hash_userID`: In the URL in your browser between `https://hashnode.com/` and /dashboard you see a long alphanumeric value, `https:// hashnode.com/{This is the publication id}/dashboard` . That’s your publication id.

## Post From Medium to Dev or Hashnode

URI: [`http://localhost:8080/api/v2/medium`](http://localhost:8080/api/v2/medium)

Body:

```json
{
    "url": "https://medium.com/@amanshri.nitrr/a-job-switch-plan-that-actually-works-e09701c26d88",
    "dev_api": "ShVKKiC9AZ1tb",
    "dev": true,
    "hash": true,
    "hash_api": "fee010ff-bde30bb9",
    "hash_userID":"fee010ff-bde30bb9",
}
```

- `url` : URL of the The Blog from Medium which is to be cross-posted (String)
- `dev` : (Boolean)
- `hash` : (Boolean)
- `dev_api` : User's dev.to API token
- `hash_api` : User's Hashnode API Token
- `hash_userID`: In the URL in your browser between `https://hashnode.com/` and /dashboard you see a long alphanumeric value, `https:// hashnode.com/{This is the publication id}/dashboard` . That’s your publication id.

## Post From Hashnode to Dev or Medium

URI: [http://localhost:8080/api/v2/hash](http://localhost:8080/api/v2/hash)

Body:

```json
{
    "url" : "https://blog.tomaszgil.me/make-the-most-out-of-your-next-migration-project",
    "dev": true,
    "medium": true,
    "dev_api": "ShVKAZ1tb",
    "medium_api":"2615790132f4a2d67f81e2696"
}
```
## Donating
  
  
Help Us Pay off Our Domain and Hosting Charges :smily <br>


<a href="https://www.buymeacoffee.com/integrateme">
<img width="208" alt="snapshot-bmc-button" src="https://user-images.githubusercontent.com/72073401/140631132-f03daad8-c1e8-45ed-970b-94f204d5bba4.png">
</a>
