require("dotenv").config();

const { execSync } = require("child_process");

const bucketName = process.env.AWS_BUCKET_NAME;
const profileName = process.env.AWS_PROFILE_NAME;

if (!bucketName) {
  console.error("AWS_BUCKET_NAME is not defined in the environment variables.");
  process.exit(1);
}

const command = `aws s3 sync ./build s3://${bucketName}/ --delete --profile ${profileName}`;

try {
  execSync(command, { stdio: "inherit" });
  console.log("S3 sync completed successfully with --delete flag.");
} catch (error) {
  console.error("Error during deployment:", error.message);
  process.exit(1);
}
