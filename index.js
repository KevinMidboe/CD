var express = require("express");
const bodyParser = require('body-parser');
const { execFile } = require('child_process');

var app = express();
app.use(bodyParser.json());

app.post("/webhooks/github", function (req, res) {
    console.log('req', req.body)

    var branch = req.body.ref;
    console.log(`Detected updates to branch: '${branch}'`)

    if(branch.indexOf('master') > -1){
        console.log('Downloading master branch');
        deploy(res);
    }
    else {
      console.log('Non-deployable branch found. Not initiating build, but responding to the webhook')
      res.sendStatus(200);
    }
})

function deploy(res){
    const child = execFile('/home/ubuntu/deployment/deploy.sh', [], { shell: true }, (error, stdout, stderr) => {
      if (error)
        console.error(error);

      console.log(stdout);
    });

    res.sendStatus(200);
}

const port = process.env.PORT || 5005;

console.log('Starting deployment server on port:', port);
app.listen(port);

