import AWS from "aws-sdk";
import s3config from "../../config/s3config";

const s3 = new AWS.S3(s3config);

export const uploadS3 = async (fileStream, imageKey, itemId, mimetype) => {
  const params = {
    Bucket: s3config.bucketName,
    Key: `${imageKey}/${itemId}`,
    Body: fileStream,
    ACL: "public-read",
    ContentType: mimetype,
  };

  try {
    const response = await s3.upload(params).promise();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};
