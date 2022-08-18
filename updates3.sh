yarn build

# Removing current files on S3
aws s3 rm s3://saulojgomes.com/ --recursive

# Copying contents of the out directory to the S3 bucket
aws s3 cp out/ s3://saulojgomes.com/ --recursive