const postFromDevController = require('../../controller/postFromDev.controller');
const axios = require('axios');

jest.mock('axios');

test('should return 400 if something is unexpected', () => {

});

test('should return 200 if posting from dev was successfull', async () => {

    const data = { "data": {
            "type_of":"article",
            "id":854719,
            "title": "JSX at lowest level",
            "description":"this post is a precursor for upcoming JSX posts   So we all heard that JSX is a specific JavaScript...",
            "readable_publish_date":"Oct 7",
            "slug":"jsx-at-lowest-level-371b",
            "path":"/iamandrewluca/jsx-at-lowest-level-371b",
            "url":"https://dev.to/iamandrewluca/jsx-at-lowest-level-371b",
            "comments_count":12,
            "public_reactions_count":159,
            "collection_id":null,
            "published_timestamp":"2021-10-07T21:58:07Z",
            "positive_reactions_count":159,
            "cover_image":"https://res.cloudinary.com/practicaldev/image/fetch/s--pLOfhZJk--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l4uvtf6thtd6b1uxh1pn.jpg",
            "social_image":"https://res.cloudinary.com/practicaldev/image/fetch/s--kiNks9JQ--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l4uvtf6thtd6b1uxh1pn.jpg",
            "canonical_url":"https://dev.to/iamandrewluca/jsx-at-lowest-level-371b",
            "created_at":"2021-10-07T07:50:21Z",
            "edited_at":"2021-10-07T22:53:18Z",
            "crossposted_at":null,
            "published_at":"2021-10-07T21:58:07Z",
            "last_comment_at":"2021-10-12T18:26:10Z",
            "reading_time_minutes":3,
            "tag_list":"react, jsx, javascript, html",
            "tags":[
               "react",
               "jsx",
               "javascript",
               "html"
            ],
            "body_html":'<a href="#">some html</a>',
            "body_markdown":"**this post is a precursor for upcoming JSX posts**\n\nSo we all heard that JSX is a specific JavaScript syntax that is used by React to render components. Well, I would say JSX is just HTML in JavaScript. Or **J**ava-**S**cript-**X**ml 😂 because HTML is a sibling of XML and children of.",
            "user":{
               "name":"Andrew Luca",
               "username":"iamandrewluca",
               "twitter_username":"iamandrewluca",
               "github_username":"iamandrewluca",
               "website_url":"https://iamandrewluca.com",
               "profile_image":"https://res.cloudinary.com/practicaldev/image/fetch/s--0U85kEDZ--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/46831/2740c75a-1a98-4863-a405-10278fdf763f.jpg",
               "profile_image_90":"https://res.cloudinary.com/practicaldev/image/fetch/s--2Qow-c9f--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/46831/2740c75a-1a98-4863-a405-10278fdf763f.jpg"
            }
        }
    };
 
    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    const request = {
        body: {
            "url": "https://dev.to/iamandrewluca/jsx-at-lowest-level-371b",
            "medium": true,
            "hash": true,
            "medium_userID": "15663e223356baa043cd6f0816d",
            "medium_token":"2615790132f4a47a93d13abd55f96",
            "hash_token": "fee010ff-bd64-496a-d28a58e30bb9"
        }
    };

    const result = await postFromDevController.postFromDev(request,null,null);
    expect(reusult).not.toBe(null);
});