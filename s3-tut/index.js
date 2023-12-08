const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAWR27ZE2DB7UBNJ5W",
    secretAccessKey: "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",
  },
});

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: "nodejspracticebuc25ani",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 20 });
  return url;
}

async function putObjectUrl(fileName, contentType) {
  const command = new PutObjectCommand({
    Bucket: "nodejspracticebuc25ani",
    Key: `/uploads/user-uploads/${fileName}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
}
// Create a default pre signed url for 15 min(it is set to default) in getSignedUrl
// getObjectUrl("/uploads/user-uploads/images-1702016218372.jpeg").then((url) => {
//   console.log(url);
// });

// for putObject
async function init() {
  console.log(
    "URL for uploading",
    await putObjectUrl(`images-${Date.now()}.jpeg`, "images/jpeg")
  );
}
// init();

// ListObjectCommand
async function listObjects() {
    const command = new ListObjectsV2Command({
        Bucket: "nodejspracticebuc25ani",
        Key: "/"
    });
    const result = await s3Client.send(command)
    console.log(result);
};

async function initComm() {
    await listObjects();
}

// initComm();

// To delete any key

async function deleteCommand(key) {
    const command = new DeleteObjectCommand({
        Bucket: "nodejspracticebuc25ani",
        Key: key,
    });
    await s3Client.send(command);
} 
// deleteCommand("Jake_s_Resume__Anonymous_.pdf");