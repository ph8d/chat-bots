const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/chat_bots', { useNewUrlParser: true });

require('./models/User');
require('./models/Message');

require('./bots/botManager').importBotsToDB((err, result) => {
    require('./bots/echoBot').init();
    require('./bots/reverseBot').init();
    require('./bots/ignoreBot').init();
    require('./bots/spamBot').init();
})

require('./socketServer').init(http);

const server = http.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port ' + server.address().port);
});
