const axios = require('axios');


module.exports = async function() {
    try {
        let result = await axios.post('https://api.hashnode.com', {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'fee010ff-bd64-496a-a384-d28a58e30bb9',
    },
        query:
        'mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }',
        variables: {
        input: {
            title: 'What are the e2e testing libraries you use ?',
            contentMarkdown: '# You can put Markdown here.\n***\n',
            tags: [
            {
                _id: '56744723958ef13879b9549b',
                slug: 'testing',
                name: 'Testing',
            },
            ],
            coverImageURL:
            'https://codybontecou.com/images/header-meta-component.png',
        },
        },
    })
    console.log(result);

    } catch(error) {
        console.log(error);
    }
}


// const result = await axios.post('https://api.hashnode.com', {
//     query: `mutation createStory($input: CreateStoryInput!){ createStory(input: $input){ code success message } }`,
//     variables: {
//         input: {
//             title: 'What are the e2e testing libraries you use ?',
//             contentMarkdown: '# You can put Markdown here.\n***\n',
//             tags: [
//             {
//                 _id: '56744723958ef13879b9549b',
//                 slug: 'testing',
//                 name: 'Testing',
//             },
//             ],
//             coverImageURL:
//             'https://codybontecou.com/images/header-meta-component.png',
//         },
//         },
// },{
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'fee010ff-bd64-496a-a384-d28a58e30bb9',
//     }
// })
// .then(res => res.json())
// .then(res => console.log(JSON.stringify(res)))