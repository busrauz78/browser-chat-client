const request = require('request');
const url = 'http://localhost:3600/messages';

describe('get messages', () => {
    it('should return status code as 200', (done) => {
        request.get(url, (error, response) => {
            console.log(JSON.parse(response.body));
            expect(response.statusCode).toEqual(200);
            done();
        });
    })
});

describe('send message', () => {
    it('should return status code as 200', (done) => {
        const message = {
            name: 'Büşra',
            message: 'Hello',
        };
        request.post(url, message, (error, response) => {
            expect(response.statusCode).toEqual(200);
            done();
        })
    });

    it('should be saved message', (done) => {
        const message = {
            name: 'Tim',
            message: 'Hello Chat',
        };
        request.post(url, message, (error, response) => {
            expect(response.statusCode).toEqual(200);
            if (response.statusCode === 200) {
                request.get(url, (error, response) => {
                    const responseBody = JSON.parse(response.body);
                    const findIndex = responseBody.find(mes => mes.name === message.name && mes.message === message.message);
                    expect(findIndex).not.toEqual(-1);
                })
            }
        });
        done();
    })
});