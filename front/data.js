/** @format */

module.exports = {
    comments: {
        popular: [
            {
                id: 1,
                user: {
                    id: 1,
                    fullname: 'Vasya',
                    avatarUrl:
                        'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
                },
                text: 'Every morning I strart my date with coffee',
                post: {
                    id: 1,
                    title: 'What about coffee?',
                },
                createdAt: new Date().toString(),
            },
        ],
        new: [
            {
                id: 2,
                user: {
                    id: 1,
                    fullname: 'Olek',
                    avatarUrl:
                        'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
                },
                text: 'Every morning I strart my date with coffee',
                post: {
                    id: 1,
                    title: 'What about coffee?',
                },
                createdAt: new Date().toString(),
            },
        ],
    },
};
