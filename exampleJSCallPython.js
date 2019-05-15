// This is just an example post call that runs the python code.
// The video is the location of the video and the faces is the location of the folder with the student faces inside.
// The json object dataArray is a list of names of people present (with one empty string at the end).

app.post('/', function(req, res) {
    const faces = req.body.faces;
    const video = req.body.video;

    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["facial_recognition.py", video, faces])


    pythonProcess.stdout.on('data', (data) => {
        const dataStr = data.toString()
        const dataArray = dataStr.split('\r\n');
        console.log(dataArray);

        res.json(dataArray);
    });
});