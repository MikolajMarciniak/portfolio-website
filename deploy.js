require('dotenv').config();

const { execSync } = require('child_process');

const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketName) {
  console.error("AWS_BUCKET_NAME is not defined in the environment variables.");
  process.exit(1);
}

// Run the AWS CLI command
const command = `aws s3 sync ./build s3://${bucketName}/`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error("Error during deployment:", error.message);
  process.exit(1);
}
